'use client'
import { CreditCardIcon, PlusSignIcon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import PaymentDialog from "../../payment-dialog";
import { Button } from "@/components/ui/button";
import { useGetReelBuxBalanceQuery } from "@/redux/store/api/reelbuxApi";

export default function ReelbuxBalanceStats() {
  const { data: reelBuxResponse, isLoading } = useGetReelBuxBalanceQuery();
  const balance = reelBuxResponse?.reel_bux_balance || 0;

  console.log("Balance::", balance, "reelBuxResponse", reelBuxResponse);

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
        <PaymentDialog
          inputDisabled={false}
          intention="add"
          dialogDescription="Add funds to your Reelbux wallet to purchase films."
          dialogTitle="Add Fund"
          intentionBtnText="Add"
          apiEndPoint=""
          triggerBtn={
            <Button variant="ghost" asChild>
              <span>
                <HugeiconsIcon icon={PlusSignIcon} />
                Add Funds
              </span>
            </Button>
          }
        />
      </div>
    </div>
  );
}
