// components\dashboard\user\distro\stats.jsx
"use client";
import { Button } from "@/components/ui/button";
import {
  CreditCardIcon,
  Dollar02Icon,
  MouseLeftClick06Icon,
} from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import PaymentDialog from "../../payment-dialog";
import { useGetDistroBalanceQuery } from "@/redux/store/api/distroApi";
import { useTransferDistroToReelBuxMutation } from "@/redux/store/api/paymentApi";
import { useState } from "react";
import { toast } from "sonner";

export default function DistroStats() {
  const {
    data: distroResponse,
    isLoading,
    error,
    refetch,
  } = useGetDistroBalanceQuery();
  const [transferDistroToReelBux, { isLoading: isTransferring }] =
    useTransferDistroToReelBuxMutation();
  const [transferAmount, setTransferAmount] = useState("");

  const {
    total_earning = 0,
    total_clicks = 0,
    distro_balance = 0,
  } = distroResponse || {};

  const handleTransfer = async () => {
    if (!transferAmount || parseFloat(transferAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (parseFloat(transferAmount) > parseFloat(distro_balance)) {
      toast.error("Insufficient distro balance");
      return;
    }

    try {
      const result = await transferDistroToReelBux({
        amount: parseFloat(transferAmount),
      }).unwrap();

      // Show success messages
      toast.success(result.message || "Transfer successful");
      toast.info(`Transfer Amount: ${result.transfer_amount}`);
      toast.info(`New Distro Balance: ${result.new_balances.distro_balance}`);
      toast.info(
        `New ReelBux Balance: ${result.new_balances.reel_bux_balance}`
      );

      // Reset transfer amount
      setTransferAmount("");

      // Refetch distro balance to update UI immediately
      refetch();
    } catch (error) {
      console.error("Transfer failed:", error);
      toast.error(error?.data?.error || "Transfer failed. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-5 my-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-secondary px-3 md:px-5 py-5 md:py-10 rounded-md animate-pulse"
          >
            <div className="h-8 bg-muted rounded mb-3"></div>
            <div className="h-10 bg-muted rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-5 my-5">
        <div className="col-span-full bg-primary/10 px-3 md:px-5 py-5 md:py-10 rounded-md text-center">
          <p className="text-destructive">Failed to load distro stats</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-5 my-5">
      {/* Total Earning */}
      <div className="bg-secondary px-3 md:px-5 py-5 md:py-10 rounded-md space-y-1 md:space-y-3 content-center">
        <h4 className="text-xl md:text-2xl text-secondary-foreground flex justify-between items-center">
          Total Earnings
          <HugeiconsIcon icon={Dollar02Icon} />
        </h4>
        <h2 className="text-3xl md:text-4xl font-black text-green-500">
          ${parseFloat(total_earning).toFixed(2)}
        </h2>
      </div>
      {/* Total Clicks */}
      <div className="bg-secondary px-3 md:px-5 py-5 md:py-10 rounded-md space-y-1 md:space-y-3 content-center">
        <h4 className="text-xl md:text-2xl text-secondary-foreground flex justify-between items-center ">
          Total Clicks
          <HugeiconsIcon icon={MouseLeftClick06Icon} />
        </h4>
        <h2 className="text-3xl md:text-4xl font-black text-green-500">
          {total_clicks}
        </h2>
      </div>
      {/* Distro balance */}
      <div className="bg-secondary px-3 md:px-5 py-5 md:py-10 rounded-md space-y-1 md:space-y-3">
        <h4 className="text-xl md:text-2xl text-secondary-foreground flex justify-between items-center">
          Distro Balance
          <HugeiconsIcon icon={CreditCardIcon} />
        </h4>
        <h2 className="text-3xl md:text-4xl font-black text-green-500">
          ${parseFloat(distro_balance).toFixed(2)}
        </h2>
        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 md:gap-3 lg:gap-5">
          <PaymentDialog
            triggerBtn={
              <Button
                variant="ghost"
                className="w-full h-full"
                asChild
                disabled={distro_balance <= 0}
              >
                <span>Move to Reelbux</span>
              </Button>
            }
            dialogTitle="Transfer money to ReelBux"
            intentionBtnText="Transfer"
            dialogDescription="Transfer money from your Distro balance to ReelBux wallet"
            inputDisabled={false}
            intention="transfer"
            maxAmount={distro_balance}
            transferAmount={transferAmount}
            setTransferAmount={setTransferAmount}
            onTransfer={handleTransfer}
            isTransferring={isTransferring}
          />
        </div>
      </div>
    </div>
  );
}
