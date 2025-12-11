// components\dashboard\user\reelbux\stats.jsx
"use client";
import {
  CreditCardIcon,
  PlusSignIcon,
  MoneySendSquareIcon,
} from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import PaymentDialog from "../../payment-dialog";
import WithdrawDialog from "../../withdraw-dialog";
import { Button } from "@/components/ui/button";
import { useGetReelBuxBalanceQuery } from "@/redux/store/api/reelbuxApi";

export default function ReelbuxBalanceStats({ onToggleTransactions, showTransactions }) {
  const {
    data: reelBuxResponse,
    isLoading,
    refetch,
  } = useGetReelBuxBalanceQuery();
  const balance = reelBuxResponse?.reel_bux_balance || 0;

  console.log("Balance::", balance, "reelBuxResponse", reelBuxResponse);

  const handleWithdrawSuccess = () => {
    // Refetch balance after successful withdrawal
    refetch();
  };

  if (isLoading) {
    return (
      <div className="my-5 bg-secondary py-5 md:py-10 px-5 rounded-md animate-pulse">
        <div className="h-8 bg-muted rounded mb-4"></div>
        <div className="h-12 bg-muted rounded"></div>
      </div>
    );
  }

  return (
    <div className="my-5 bg-secondary py-5 md:py-10 px-5 rounded-md">
      <span className="flex gap-2 items-center">
        <HugeiconsIcon icon={CreditCardIcon} className="md:size-8" />
        <h4 className="font-semibold text-xl md:text-2xl">ReelBux Balance</h4>
      </span>
      <div className="mt-5 flex justify-between items-end">
        <h2 className="text-3xl md:text-4xl font-black grow w-full">
          ${balance.toFixed(2)}
        </h2>
        <div className="shrink-0 flex items-center gap-4">
          <PaymentDialog
            inputDisabled={false}
            intention="add"
            dialogDescription="Add funds to your ReelBux wallet. You can pay with card, PayPal, or transfer from your Distro balance."
            dialogTitle="Add Funds to ReelBux"
            intentionBtnText="Add Funds"
            triggerBtn={
              <Button variant="ghost" asChild>
                <span>
                  <HugeiconsIcon icon={PlusSignIcon} />
                  Add Funds
                </span>
              </Button>
            }
          />
          <WithdrawDialog
            maxAmount={balance}
            dialogDescription="Withdraw your ReelBux balance to your bank account. Your funds will be transferred within 1-3 business days."
            dialogTitle="Withdraw ReelBux"
            onWithdrawSuccess={handleWithdrawSuccess}
            triggerBtn={
              <Button variant="ghost" asChild disabled={balance <= 0}>
                <span>
                  <HugeiconsIcon icon={MoneySendSquareIcon} />
                  Withdraw
                </span>
              </Button>
            }
          />
          <Button
            onClick={onToggleTransactions}
            className="flex items-center gap-2 cursor-pointer hover:bg-secondary/80 transition-all bg-transparent text-sm text-muted-foreground underline"
          >            {showTransactions ? (
              <>
                Hide History
                {/* <ChevronUp className="w-4 h-4" /> */}
              </>
            ) : (
              <>
                Transactions History
                {/* <ChevronDown className="w-4 h-4" /> */}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
