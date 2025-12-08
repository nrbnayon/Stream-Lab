// components/dashboard/withdraw-dialog.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWithdrawReelBuxMutation } from "@/redux/store/api/paymentApi";

export default function WithdrawDialog({
  triggerBtn,
  dialogTitle = "Withdraw ReelBux",
  dialogDescription = "Withdraw your ReelBux balance to your bank account",
  maxAmount = 0,
  onWithdrawSuccess,
}) {
  const router = useRouter();
  const [withdrawReelBux, { isLoading: isWithdrawing }] =
    useWithdrawReelBuxMutation();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Format card number (display only - last 4 digits)
  const formatCardNumber = (value) => {
    // Remove non-digits
    const digitsOnly = value.replace(/\D/g, "");
    // Only keep first 16 digits
    const truncated = digitsOnly.slice(0, 16);
    // Format as XXXX XXXX XXXX 1234
    if (truncated.length > 0) {
      const lastFour = truncated.slice(-4);
      return `•••• •••• •••• ${lastFour}`;
    }
    return "";
  };

  // Validation functions
  const isValidAmount = () => {
    if (!withdrawAmount) return false;
    const amount = parseFloat(withdrawAmount);
    return !isNaN(amount) && amount > 0 && amount <= parseFloat(maxAmount);
  };

  const isValidCardNumber = () => {
    const digitsOnly = cardNumber.replace(/\D/g, "");
    return digitsOnly.length === 16;
  };

  const isValidCardholderName = () => {
    return cardholderName.trim().length > 0;
  };

  const isFormValid = () => {
    return isValidAmount() && isValidCardNumber() && isValidCardholderName();
  };

  const getErrorMessage = () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      return "Please enter a valid amount";
    }
    if (parseFloat(withdrawAmount) > parseFloat(maxAmount)) {
      return "Insufficient ReelBux balance";
    }
    if (!isValidCardNumber()) {
      return "Please enter a valid 16-digit card number";
    }
    if (!isValidCardholderName()) {
      return "Please enter cardholder name";
    }
    return "";
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    // Only allow digits
    const digitsOnly = value.replace(/\D/g, "");
    // Only keep first 16 digits
    const truncated = digitsOnly.slice(0, 16);
    // Format with spaces every 4 digits
    const formatted = truncated.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formatted);
  };

  const handleShowConfirmation = (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      return;
    }
    setShowConfirmation(true);
  };

  const handleWithdraw = async () => {
    setShowConfirmation(false);
    setIsProcessing(true);

    try {
      const result = await withdrawReelBux({
        amount: parseFloat(withdrawAmount),
        card_number: cardNumber.replace(/\s/g, ""),
        cardholder_name: cardholderName,
      }).unwrap();

      if (result?.message) {
        toast.success(result.message || "Withdrawal successful!");

        // Show withdrawal details
        if (result?.withdrawal_amount) {
          toast.info(`Withdrawal Amount: $${result.withdrawal_amount}`);
        }
        if (result?.new_balance) {
          toast.info(`New ReelBux Balance: $${result.new_balance}`);
        }

        // Reset form
        setWithdrawAmount("");
        setCardNumber("");
        setCardholderName("");
        setIsDialogOpen(false);

        // Call callback if provided
        if (onWithdrawSuccess) {
          onWithdrawSuccess(result);
        }
      }
    } catch (error) {
      console.error("Withdrawal failed:", error);
      toast.error(
        error?.data?.error ||
          error?.data?.message ||
          "Withdrawal failed. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setIsProcessing(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{triggerBtn}</DialogTrigger>
      <DialogContent>
        <form onSubmit={handleShowConfirmation}>
          <DialogHeader className="my-3">
            <DialogTitle>{dialogTitle}</DialogTitle>
            {dialogDescription && (
              <DialogDescription>{dialogDescription}</DialogDescription>
            )}
          </DialogHeader>

          <div className="space-y-4">
            {/* Withdrawal Amount */}
            <div>
              <Label htmlFor="withdraw-amount">Withdrawal Amount ($)</Label>
              <Input
                id="withdraw-amount"
                type="number"
                min="1"
                max={maxAmount}
                step="0.01"
                disabled={isWithdrawing || isProcessing}
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Enter amount to withdraw"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Available: ${parseFloat(maxAmount || 0).toFixed(2)}
              </p>
            </div>

            {/* Card Number */}
            <div>
              <Label htmlFor="card-number">Card Number (16 digits)</Label>
              <Input
                id="card-number"
                type="text"
                maxLength="19"
                disabled={isWithdrawing || isProcessing}
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Your card information will be used for withdrawal
              </p>
            </div>

            {/* Cardholder Name */}
            <div>
              <Label htmlFor="cardholder-name">Cardholder Name</Label>
              <Input
                id="cardholder-name"
                type="text"
                disabled={isWithdrawing || isProcessing}
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                placeholder="John Doe"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Name on the card
              </p>
            </div>

            {/* Error Message */}
            {getErrorMessage() && (
              <p className="text-destructive text-center text-sm">
                {getErrorMessage()}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full my-3"
              disabled={!isFormValid() || isWithdrawing || isProcessing}
            >
              {isProcessing || isWithdrawing ? "Processing..." : "Continue"}
            </Button>
          </DialogFooter>
        </form>

        {/* Withdrawal Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 rounded-lg">
            <div className="bg-black rounded-lg p-6 max-w-md w-full mx-4 border border-muted">
              <h3 className="text-lg font-semibold mb-4">Confirm Withdrawal</h3>
              <div className="space-y-3 mb-6">
                <p className="text-sm text-muted-foreground">
                  Please review your withdrawal details before proceeding.
                </p>
                <div className="bg-muted/20 p-4 rounded-lg space-y-3 border border-muted">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Withdrawal Amount:
                    </span>
                    <span className="font-semibold text-green-500">
                      ${parseFloat(withdrawAmount || 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Card Number:
                    </span>
                    <span className="text-sm font-mono">
                      {formatCardNumber(cardNumber)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Cardholder Name:
                    </span>
                    <span className="text-sm">{cardholderName}</span>
                  </div>
                  <div className="pt-3 border-t border-muted flex justify-between items-center">
                    <span className="text-sm font-medium">
                      Processing Time:
                    </span>
                    <span className="text-sm text-muted-foreground">
                      1-3 business days
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="flex-1"
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleWithdraw}
                  className="flex-1"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Confirm Withdrawal"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
