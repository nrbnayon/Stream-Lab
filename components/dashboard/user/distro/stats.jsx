"use client";
import { Button } from "@/components/ui/button";
import {
  CreditCardIcon,
  Dollar02Icon,
  MouseLeftClick06Icon,
} from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import PaymentDialog from "../../payment-dialog";
import PaymentTriggerBtn from "../../payment-trigger-btn";

export default function DistroStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-5 my-5">
      {/* Total Earning */}
      <div className="bg-secondary px-3 md:px-5 py-5 md:py-10 rounded-md space-y-1 md:space-y-3 content-center">
        <h4 className="text-xl md:text-2xl text-secondary-foreground flex justify-between items-center">
          Total Earnings
          <HugeiconsIcon icon={Dollar02Icon} />
        </h4>
        <h2 className="text-3xl md:text-4xl font-black text-green-500">
          $25.50
        </h2>
      </div>
      {/* Total Clicks */}
      <div className="bg-secondary px-3 md:px-5 py-5 md:py-10 rounded-md space-y-1 md:space-y-3 content-center">
        <h4 className="text-xl md:text-2xl text-secondary-foreground flex justify-between items-center">
          Total Clicks
          <HugeiconsIcon icon={MouseLeftClick06Icon} />
        </h4>
        <h2 className="text-3xl md:text-4xl font-black">48</h2>
      </div>
      {/* Distro balance */}
      <div className="col-span-2 bg-secondary px-3 md:px-5 py-5 md:py-10 rounded-md space-y-1 md:space-y-3">
        <h4 className="text-xl md:text-2xl text-secondary-foreground flex justify-between items-center">
          Distro Balance
          <HugeiconsIcon icon={CreditCardIcon} />
        </h4>
        <h2 className="text-3xl md:text-4xl font-black text-green-500">
          $25.50
        </h2>
        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 md:gap-3 lg:gap-5">
          <PaymentDialog
            triggerBtn={
              <PaymentTriggerBtn
                variant="ghost"
                className="w-full h-full"
                asChild
              >
                <span>Move to Reelbux</span>
              </PaymentTriggerBtn>
            }
            dialogTitle="Transfer money to ReelBux"
            intentionBtnText="Transfer"
            dialogDescription="Add money to your Reelbux wallet"
            inputDisabled={false}
            intention="transfer"
          />
          <Button variant="ghost">Withdraw</Button>
        </div>
      </div>
    </div>
  );
}
