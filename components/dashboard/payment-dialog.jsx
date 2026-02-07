// components\dashboard\payment-dialog.jsx
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
import {
  useCreateStripePurchaseCheckoutMutation,
  useCreatePayPalPurchaseCheckoutMutation,
  usePurchaseFilmWithReelBuxMutation,
  useCreateStripeRentalCheckoutMutation,
  useCreatePayPalRentalCheckoutMutation,
  useRentFilmWithReelBuxMutation,
  useCreateStripeAddFundsCheckoutMutation,
  useCreatePayPalAddFundsCheckoutMutation,
  useTransferDistroToReelBuxMutation,
} from "@/redux/store/api/paymentApi";
import { useDispatch } from "react-redux";
import { filmsApi } from "@/redux/store/api/filmsApi";
import { useGetMeQuery } from "@/redux/store/api/usersApi";

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
  const dispatch = useDispatch();
  const { data: currentUser } = useGetMeQuery();

  const systemPayOption = intention === "add" ? "Distro" : "ReelBux";

  const [amount, setAmount] = useState(
    inputValue ||
      (intention === "transfer" ? 10 : intention === "add" ? 10 : 1),
  );
  const [rentTime, setRentTime] = useState("24");
  const [paymentMethod, setPaymentMethod] = useState(
    intention === "add" ? "card" : "card",
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReelBuxConfirm, setShowReelBuxConfirm] = useState(false);
  const [showDistroConfirm, setShowDistroConfirm] = useState(false);

  // Payment mutations
  const [createStripePurchaseCheckout] =
    useCreateStripePurchaseCheckoutMutation();
  const [createPayPalPurchaseCheckout] =
    useCreatePayPalPurchaseCheckoutMutation();
  const [purchaseFilmWithReelBux] = usePurchaseFilmWithReelBuxMutation();
  const [createStripeRentalCheckout] = useCreateStripeRentalCheckoutMutation();
  const [createPayPalRentalCheckout] = useCreatePayPalRentalCheckoutMutation();
  const [rentFilmWithReelBux] = useRentFilmWithReelBuxMutation();

  // Add funds mutations
  const [createStripeAddFundsCheckout] =
    useCreateStripeAddFundsCheckoutMutation();
  const [createPayPalAddFundsCheckout] =
    useCreatePayPalAddFundsCheckoutMutation();
  const [transferDistroToReelBux] = useTransferDistroToReelBuxMutation();

  // Use transferAmount and setTransferAmount for transfer intention
  const currentAmount = intention === "transfer" ? transferAmount : amount;
  const setCurrentAmount =
    intention === "transfer" ? setTransferAmount : setAmount;

  // Validation for transfer and add funds
  const isValidAmount = () => {
    if (intention !== "transfer" && intention !== "add") return true;

    const numAmount = parseFloat(currentAmount);
    if (!currentAmount || isNaN(numAmount) || numAmount <= 0) {
      return false;
    }

    if (intention === "transfer" && numAmount > parseFloat(maxAmount)) {
      return false;
    }

    return true;
  };

  const handlePaymentSuccess = (message) => {
    toast.success(message || "Payment successful!");
    setIsDialogOpen(false);

    if (intention === "add") {
      router.push("/add-funds/success?status=success");
    } else {
      // Invalidate library cache before navigation
      dispatch(filmsApi.util.invalidateTags(["MyLibrary"]));
      router.push("/my-library");
    }
  };

  const handlePaymentCancel = () => {
    toast.info("Payment cancelled");
    setIsDialogOpen(false);
  };

  const handlePaymentError = (error) => {
    console.error("Payment error:", error);
    toast.error(
      error?.data?.message ||
        error?.message ||
        "Before payment signin or signup first.",
    );
    setIsProcessing(false);
  };

  // Process film purchase/rental with Stripe
  const processStripePayment = async () => {
    try {
      let response;

      if (intention === "add") {
        // Add funds with Stripe
        response = await createStripeAddFundsCheckout({
          amount: parseFloat(currentAmount),
        }).unwrap();
      } else {
        // Film purchase/rental
        const paymentData = {
          film_id: filmId,
          ...(referralCode && { referral_code: referralCode }),
        };

        if (intention === "buy") {
          response = await createStripePurchaseCheckout(paymentData).unwrap();
        } else if (intention === "rent") {
          response = await createStripeRentalCheckout({
            ...paymentData,
            rent_price: parseFloat(maxRentPrice), // UPDATED: Use maxRentPrice directly
            rent_hour: parseInt(rentTime),
          }).unwrap();
        }
      }

      if (response?.checkoutUrl) {
        window.location.href = response.checkoutUrl;
      }
    } catch (error) {
      handlePaymentError(error);
    }
  };

  // Process film purchase/rental with PayPal
  const processPayPalPayment = async () => {
    try {
      let response;

      if (intention === "add") {
        // Add funds with PayPal
        response = await createPayPalAddFundsCheckout({
          amount: parseFloat(currentAmount),
        }).unwrap();
      } else {
        // Film purchase/rental
        const paymentData = {
          film_id: filmId,
          ...(referralCode && { referral_code: referralCode }),
        };

        if (intention === "buy") {
          response = await createPayPalPurchaseCheckout(paymentData).unwrap();
        } else if (intention === "rent") {
          response = await createPayPalRentalCheckout({
            ...paymentData,
            rent_price: parseFloat(maxRentPrice), // UPDATED: Use maxRentPrice directly
            rent_hour: parseInt(rentTime),
          }).unwrap();
        }
      }

      if (response?.approvalUrl) {
        window.location.href = response.approvalUrl;
      }
    } catch (error) {
      handlePaymentError(error);
    }
  };

  // Process ReelBux payment (only for films)
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
          rent_price: parseFloat(maxRentPrice), // UPDATED: Use maxRentPrice directly
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

  // Process Distro to ReelBux transfer
  const processDistroTransfer = async () => {
    try {
      const response = await transferDistroToReelBux({
        amount: parseFloat(currentAmount),
      }).unwrap();

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

  const handleDistroConfirm = async () => {
    setShowDistroConfirm(false);
    setIsProcessing(true);
    await processDistroTransfer();
  };

  const handleDistroCancel = () => {
    setShowDistroConfirm(false);
    setIsProcessing(false);
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    // Check authentication for buy and rent
    if ((intention === "buy" || intention === "rent") && !currentUser) {
      router.push("/signin");
      return;
    }

    if (intention === "transfer") {
      if (!isValidAmount()) {
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

    // Validate amount for add funds
    if (intention === "add" && !isValidAmount()) {
      toast.error("Please enter a valid amount");
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
          if (intention === "add") {
            // For add funds, use Distro transfer
            setShowDistroConfirm(true);
            setIsProcessing(false);
          } else {
            // Show confirmation modal for ReelBux film payment
            setShowReelBuxConfirm(true);
            setIsProcessing(false);
          }
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
    if (intention !== "transfer" && intention !== "add") return "";

    const numAmount = parseFloat(currentAmount);

    if (!currentAmount || isNaN(numAmount) || numAmount <= 0) {
      return "Please enter a valid amount";
    }

    if (intention === "transfer" && numAmount > parseFloat(maxAmount)) {
      return "Insufficient distro balance";
    }

    return "";
  };

  const errorMessage = getErrorMessage();

  // Get payment method options based on intention
  const getPaymentMethodOptions = () => {
    if (intention === "add") {
      return (
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
            <Label htmlFor="reelbux">Transfer from Distro</Label>
          </div>
        </RadioGroup>
      );
    }

    // Default payment methods for films
    return (
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
    );
  };

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
                <Label htmlFor="amount">Amount ($): </Label>
                {/* Show as plain text for buy/rent, input for transfer/add */}
                {intention === "buy" || intention === "rent" ? (
                  <div className="text-lg font-semibold text-primary">
                    ${intention === "rent" ? maxRentPrice : inputValue}
                  </div>
                ) : (
                  <>
                    <Input
                      id="amount"
                      type="number"
                      min={
                        intention === "transfer" || intention === "add" ? 1 : 1
                      }
                      max={intention === "transfer" ? maxAmount : undefined}
                      step="0.01"
                      disabled={inputDisabled || isTransferring || isProcessing}
                      value={currentAmount}
                      onChange={(e) => setCurrentAmount(e.target.value)}
                      placeholder="Enter amount"
                    />
                    {intention === "transfer" && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Available: ${parseFloat(maxAmount).toFixed(2)}
                      </p>
                    )}
                    {intention === "add" && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Minimum: $1.00
                      </p>
                    )}
                  </>
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
                        <SelectItem value="24">24 hours</SelectItem>
                        <SelectItem value="48">48 hours</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Show payment methods if not transfer */}
            {intention !== "transfer" && (
              <div>
                <Label className="text-sm font-medium">Payment Method</Label>
                {getPaymentMethodOptions()}
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

        {/* ReelBux Confirmation Modal (for films) */}
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
                      ${intention === "rent" ? maxRentPrice : currentAmount}{" "}
                      {/* UPDATED */}
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

        {/* Distro Transfer Confirmation Modal (for add funds) */}
        {showDistroConfirm && (
          <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
            <div className="bg-black rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">
                Confirm Distro Transfer
              </h3>
              <div className="space-y-3 mb-6">
                <p className="text-sm text-muted-foreground">
                  You are about to transfer ${currentAmount} from your Distro
                  balance to ReelBux.
                </p>
                <div className="bg-muted p-3 rounded">
                  <div className="flex justify-between">
                    <span>Transfer Amount:</span>
                    <span>${currentAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>From:</span>
                    <span>Distro Balance</span>
                  </div>
                  <div className="flex justify-between font-medium mt-2 pt-2 border-t">
                    <span>To:</span>
                    <span>ReelBux Balance</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleDistroCancel}
                  variant="outline"
                  className="flex-1"
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDistroConfirm}
                  className="flex-1"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Confirm Transfer"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
