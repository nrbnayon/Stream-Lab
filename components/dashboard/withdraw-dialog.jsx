// components/dashboard/withdraw-dialog.jsx
"use client";
import { useState, useEffect } from "react";
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
import {
  useConnectStripeAccountMutation,
  useRequestWithdrawalMutation,
} from "@/redux/store/api/paymentApi";

export default function WithdrawDialog({
  triggerBtn,
  dialogTitle = "Withdraw ReelBux",
  dialogDescription = "Withdraw your ReelBux balance to your Stripe account",
  maxAmount = 0,
  onWithdrawSuccess,
}) {
  const router = useRouter();
  const [connectStripeAccount, { isLoading: isConnecting }] =
    useConnectStripeAccountMutation();
  const [requestWithdrawal, { isLoading: isWithdrawing }] =
    useRequestWithdrawalMutation();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Stripe account connection state
  const [stripeAccountStatus, setStripeAccountStatus] = useState(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

  // Check Stripe connection status when dialog opens
  useEffect(() => {
    if (isDialogOpen) {
      checkStripeStatus();
    }
  }, [isDialogOpen]);

  const checkStripeStatus = async () => {
    setIsCheckingStatus(true);
    try {
      const result = await connectStripeAccount().unwrap();
      setStripeAccountStatus(result);
    } catch (error) {
      console.error("Failed to check Stripe status:", error);
      toast.error("Failed to check Stripe account status");
    } finally {
      setIsCheckingStatus(false);
    }
  };

  const handleConnectStripe = async () => {
    try {
      const result = await connectStripeAccount().unwrap();
      if (result?.onboarding_url) {
        // Open Stripe onboarding in new window
        window.open(result.onboarding_url, "_blank");
        toast.info("Complete Stripe account setup in the new window");
        
        // Update status after opening
        setStripeAccountStatus(result);
      }
    } catch (error) {
      console.error("Failed to connect Stripe account:", error);
      toast.error(
        error?.data?.message || "Failed to connect Stripe account"
      );
    }
  };

  const isStripeFullyConnected = () => {
    return (
      stripeAccountStatus?.charges_enabled &&
      stripeAccountStatus?.payouts_enabled &&
      stripeAccountStatus?.details_submitted
    );
  };

  // Validation functions
  const isValidAmount = () => {
    if (!withdrawAmount) return false;
    const amount = parseFloat(withdrawAmount);
    return !isNaN(amount) && amount > 0 && amount <= parseFloat(maxAmount);
  };

  const getErrorMessage = () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      return "Please enter a valid amount";
    }
    if (parseFloat(withdrawAmount) > parseFloat(maxAmount)) {
      return "Insufficient ReelBux balance";
    }
    return "";
  };

  const handleShowConfirmation = (e) => {
    e.preventDefault();
    if (!isValidAmount()) {
      return;
    }
    setShowConfirmation(true);
  };

  const handleWithdraw = async () => {
    setShowConfirmation(false);
    setIsProcessing(true);

    try {
      const result = await requestWithdrawal({
        amount: parseFloat(withdrawAmount),
      }).unwrap();

      if (result?.message) {
        toast.success(result.message || "Withdrawal request submitted successfully!");

        // Show withdrawal details
        if (result?.withdrawal_id) {
          toast.info(`Withdrawal ID: ${result.withdrawal_id}`);
        }
        if (result?.amount) {
          toast.info(`Amount: $${result.amount}`);
        }
        if (result?.stripe_account) {
          toast.info(`Stripe Account: ${result.stripe_account}`);
        }

        // Reset form
        setWithdrawAmount("");
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
        <DialogHeader className="my-3">
          <DialogTitle>{dialogTitle}</DialogTitle>
          {dialogDescription && (
            <DialogDescription>{dialogDescription}</DialogDescription>
          )}
        </DialogHeader>

        {isCheckingStatus ? (
          <div className="space-y-4 py-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Checking Stripe account status...
            </p>
          </div>
        ) : !isStripeFullyConnected() ? (
          // Stripe Account Connection Required
          <div className="space-y-4">
            <div className="bg-muted/20 p-4 rounded-lg border border-muted">
              <h4 className="font-semibold mb-2">Connect Your Stripe Account</h4>
              <p className="text-sm text-muted-foreground mb-4">
                To withdraw funds, you need to connect your Stripe account.
                This is a secure one-time setup that allows us to transfer
                money directly to your account.
              </p>

              {stripeAccountStatus && (
                <div className="space-y-2 mb-4">
                  <p className="text-sm font-medium">Account Status:</p>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-block w-2 h-2 rounded-full ${
                          stripeAccountStatus.charges_enabled
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      ></span>
                      <span>
                        Charges {stripeAccountStatus.charges_enabled ? "Enabled" : "Pending"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-block w-2 h-2 rounded-full ${
                          stripeAccountStatus.payouts_enabled
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      ></span>
                      <span>
                        Payouts {stripeAccountStatus.payouts_enabled ? "Enabled" : "Pending"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-block w-2 h-2 rounded-full ${
                          stripeAccountStatus.details_submitted
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      ></span>
                      <span>
                        Details {stripeAccountStatus.details_submitted ? "Submitted" : "Pending"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              <Button
                onClick={handleConnectStripe}
                disabled={isConnecting}
                className="w-full"
              >
                {isConnecting
                  ? "Connecting..."
                  : stripeAccountStatus
                  ? "Continue Setup"
                  : "Connect Stripe Account"}
              </Button>

              {stripeAccountStatus && !isStripeFullyConnected() && (
                <Button
                  onClick={checkStripeStatus}
                  variant="outline"
                  className="w-full mt-2"
                  disabled={isCheckingStatus}
                >
                  Refresh Status
                </Button>
              )}
            </div>
          </div>
        ) : (
          // Withdrawal Form (when Stripe is connected)
          <form onSubmit={handleShowConfirmation}>
            <div className="space-y-4">
              {/* Stripe Connected Status */}
              <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="font-medium">Stripe Account Connected</span>
                  </div>
                  {stripeAccountStatus?.onboarding_url && (
                    <Button
                      type="button"
                      variant="link"
                      size="sm"
                      className="h-auto p-0 text-green-600 dark:text-green-400"
                      onClick={() => window.open(stripeAccountStatus.onboarding_url, "_blank")}
                    >
                      Manage Account →
                    </Button>
                  )}
                </div>
              </div>

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
                disabled={!isValidAmount() || isWithdrawing || isProcessing}
              >
                {isProcessing || isWithdrawing ? "Processing..." : "Continue"}
              </Button>
            </DialogFooter>
          </form>
        )}

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
                      Destination:
                    </span>
                    <span className="text-sm">Stripe Account</span>
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
