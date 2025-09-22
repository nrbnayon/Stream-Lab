"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useGetMeQuery } from "@/redux/store/api/usersApi";
import {
  useCreateStripePurchaseCheckoutMutation,
  useCreatePayPalPurchaseCheckoutMutation,
  usePurchaseFilmWithReelBuxMutation,
  useCreateStripeRentalCheckoutMutation,
  useCreatePayPalRentalCheckoutMutation,
  useRentFilmWithReelBuxMutation,
} from "@/redux/store/api/paymentApi";

export default function PaymentDialog({
  intention = "",
  triggerBtn,
  intentionBtnText = "",
  dialogTitle = "",
  dialogDescription = "",
  inputDisabled = true,
  inputValue,
  maxAmount = 0,
  transferAmount,
  setTransferAmount,
  onTransfer,
  isTransferring = false,
  filmId,
  filmTitle,
  maxRentPrice,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const referralCode = searchParams.get("referral") || "";

  const systemPayOption = intention === "add" ? "Distro" : "ReelBux";

  const [amount, setAmount] = useState(
    inputValue || (intention === "transfer" ? 10 : 1)
  );
  const [rentTime, setRentTime] = useState("24");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReelBuxConfirm, setShowReelBuxConfirm] = useState(false);

  // Payment mutations
  const [createStripePurchaseCheckout] =
    useCreateStripePurchaseCheckoutMutation();
  const [createPayPalPurchaseCheckout] =
    useCreatePayPalPurchaseCheckoutMutation();
  const [purchaseFilmWithReelBux] = usePurchaseFilmWithReelBuxMutation();
  const [createStripeRentalCheckout] = useCreateStripeRentalCheckoutMutation();
  const [createPayPalRentalCheckout] = useCreatePayPalRentalCheckoutMutation();
  const [rentFilmWithReelBux] = useRentFilmWithReelBuxMutation();

  // Use transferAmount and setTransferAmount for transfer intention
  const currentAmount = intention === "transfer" ? transferAmount : amount;
  const setCurrentAmount =
    intention === "transfer" ? setTransferAmount : setAmount;

  // Calculate rent price based on selected hours
  const calculateRentPrice = (basePrice, hours) => {
    const maxHours = 72; // Maximum rent hours
    const hourlyRate = basePrice / maxHours;
    return (hourlyRate * hours).toFixed(2);
  };

  const getRentPrice = () => {
    if (intention === "rent" && maxRentPrice) {
      return calculateRentPrice(maxRentPrice, parseInt(rentTime));
    }
    return currentAmount;
  };

  // Validation for transfer
  const isValidTransfer = () => {
    if (intention !== "transfer") return true;

    const numAmount = parseFloat(currentAmount);
    if (!currentAmount || isNaN(numAmount) || numAmount <= 0) {
      return false;
    }

    if (numAmount > parseFloat(maxAmount)) {
      return false;
    }

    return true;
  };

  const handlePaymentSuccess = (message) => {
    toast.success(message || "Payment successful!");
    setIsDialogOpen(false);
    router.push("/my-library");
  };

  const handlePaymentCancel = () => {
    toast.info("Payment cancelled");
    setIsDialogOpen(false);
  };

  const handlePaymentError = (error) => {
    console.error("Payment error:", error);
    toast.error(error?.data?.message || "Payment failed. Please try again.");
    setIsProcessing(false);
  };

  const processStripePayment = async () => {
    try {
      let response;
      const paymentData = {
        film_id: filmId,
        ...(referralCode && { referral_code: referralCode }),
      };

      if (intention === "buy") {
        response = await createStripePurchaseCheckout(paymentData).unwrap();
      } else if (intention === "rent") {
        response = await createStripeRentalCheckout({
          ...paymentData,
          rent_price: parseFloat(getRentPrice()),
          rent_hour: parseInt(rentTime),
        }).unwrap();
      }

      if (response?.checkoutUrl) {
        window.location.href = response.checkoutUrl;
      }
    } catch (error) {
      handlePaymentError(error);
    }
  };

  const processPayPalPayment = async () => {
    try {
      let response;
      const paymentData = {
        film_id: filmId,
        ...(referralCode && { referral_code: referralCode }),
      };

      if (intention === "buy") {
        response = await createPayPalPurchaseCheckout(paymentData).unwrap();
      } else if (intention === "rent") {
        response = await createPayPalRentalCheckout({
          ...paymentData,
          rent_price: parseFloat(getRentPrice()),
          rent_hour: parseInt(rentTime),
        }).unwrap();
      }

      if (response?.approvalUrl) {
        window.location.href = response.approvalUrl;
      }
    } catch (error) {
      handlePaymentError(error);
    }
  };

  const processReelBuxPayment = async () => {
    try {
      let response;
      const paymentData = {
        film_id: filmId,
        ...(referralCode && { distro_code: referralCode }),
      };

      if (intention === "buy") {
        response = await purchaseFilmWithReelBux(paymentData).unwrap();
      } else if (intention === "rent") {
        response = await rentFilmWithReelBux({
          ...paymentData,
          rent_price: parseFloat(getRentPrice()),
          rent_hour: parseInt(rentTime),
        }).unwrap();
      }

      if (response?.message) {
        handlePaymentSuccess(response.message);
      }
    } catch (error) {
      handlePaymentError(error);
    }
  };

  const handleReelBuxConfirm = async () => {
    setShowReelBuxConfirm(false);
    setIsProcessing(true);
    await processReelBuxPayment();
  };

  const handleReelBuxCancel = () => {
    setShowReelBuxConfirm(false);
    setIsProcessing(false);
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (intention === "transfer") {
      if (!isValidTransfer()) {
        toast.error("Please enter a valid amount");
        return;
      }

      try {
        await onTransfer();
        setIsDialogOpen(false);
      } catch (error) {
        // Error is handled in the parent component
      }
      return;
    }

    // Validate rent time for rental
    if (intention === "rent" && !rentTime) {
      toast.error("Please select rental duration");
      return;
    }

    setIsProcessing(true);

    try {
      switch (paymentMethod) {
        case "card":
          await processStripePayment();
          break;
        case "paypal":
          await processPayPalPayment();
          break;
        case "reelbux":
          // Show confirmation modal for ReelBux
          setShowReelBuxConfirm(true);
          setIsProcessing(false);
          break;
        default:
          toast.error("Please select a payment method");
          setIsProcessing(false);
          break;
      }
    } catch (error) {
      handlePaymentError(error);
    }
  };

  const getErrorMessage = () => {
    if (intention !== "transfer") return "";

    const numAmount = parseFloat(currentAmount);

    if (!currentAmount || isNaN(numAmount) || numAmount <= 0) {
      return "Please enter a valid amount";
    }

    if (numAmount > parseFloat(maxAmount)) {
      return "Insufficient distro balance";
    }

    return "";
  };

  const errorMessage = getErrorMessage();

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{triggerBtn}</DialogTrigger>
      <DialogContent>
        <form onSubmit={handlePayment}>
          <DialogHeader className="my-3">
            <DialogTitle>{dialogTitle}</DialogTitle>
            {dialogDescription && (
              <DialogDescription>{dialogDescription}</DialogDescription>
            )}
          </DialogHeader>

          <div className="space-y-3">
            {/* Amount and rent time */}
            <div className="flex gap-3">
              {/* Amount Field */}
              <div className="grow">
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  min={intention === "transfer" ? 1 : 1}
                  max={intention === "transfer" ? maxAmount : undefined}
                  step="0.01"
                  disabled={
                    inputDisabled ||
                    isTransferring ||
                    isProcessing ||
                    intention === "rent"
                  }
                  value={intention === "rent" ? getRentPrice() : currentAmount}
                  onChange={(e) => setCurrentAmount(e.target.value)}
                  placeholder="Enter amount"
                />
                {intention === "transfer" && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Available: ${parseFloat(maxAmount).toFixed(2)}
                  </p>
                )}
              </div>

              {/* If for rent - select rent time */}
              {intention === "rent" && (
                <div className="min-w-[120px]">
                  <Label>Rent Time</Label>
                  <Select value={rentTime} onValueChange={setRentTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="4">4 hours</SelectItem>
                        <SelectItem value="6">6 hours</SelectItem>
                        <SelectItem value="12">12 hours</SelectItem>
                        <SelectItem value="24">24 hours</SelectItem>
                        <SelectItem value="48">48 hours</SelectItem>
                        <SelectItem value="72">72 hours</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Show source if not case is transfer */}
            {intention !== "transfer" && (
              <div>
                <Label className="text-sm font-medium">Payment Method</Label>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="mt-2"
                  disabled={isProcessing}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Card (Stripe)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="reelbux" id="reelbux" />
                    <Label htmlFor="reelbux">ReelBux</Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Show error message */}
            {errorMessage && (
              <p className="text-destructive text-center text-sm">
                {errorMessage}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full my-3"
              disabled={!!errorMessage || isTransferring || isProcessing}
            >
              {isProcessing
                ? "Processing..."
                : isTransferring
                ? "Processing..."
                : intentionBtnText}
            </Button>
          </DialogFooter>
        </form>

        {/* ReelBux Confirmation Modal */}
        {showReelBuxConfirm && (
          <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
            <div className="bg-black rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">
                Confirm ReelBux Payment
              </h3>
              <div className="space-y-3 mb-6">
                <p className="text-sm text-muted-foreground">
                  You are about to {intention} "{filmTitle}" using ReelBux.
                </p>
                <div className="bg-muted p-3 rounded">
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span>
                      ${intention === "rent" ? getRentPrice() : currentAmount}
                    </span>
                  </div>
                  {intention === "rent" && (
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>{rentTime} hours</span>
                    </div>
                  )}
                  <div className="flex justify-between font-medium mt-2 pt-2 border-t">
                    <span>Payment Method:</span>
                    <span>ReelBux</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleReelBuxCancel}
                  variant="outline"
                  className="flex-1"
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleReelBuxConfirm}
                  className="flex-1"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Confirm Payment"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
