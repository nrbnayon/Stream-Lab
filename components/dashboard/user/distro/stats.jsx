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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-5">
      <div className="bg-secondary px-5 py-10 rounded-md space-y-3 content-center">
        <h4 className="text-xl text-secondary-foreground flex justify-between items-center">
          Total Earnings
          <HugeiconsIcon icon={Dollar02Icon} />
        </h4>
        <h2 className="text-4xl font-black text-green-500">$25.50</h2>
      </div>
      <div className="bg-secondary py-10 rounded-md px-5 space-y-3 content-center">
        <h4 className="text-xl text-secondary-foreground flex justify-between items-center">
          Total Clicks
          <HugeiconsIcon icon={MouseLeftClick06Icon} />
        </h4>
        <h2 className="text-4xl font-black">48</h2>
      </div>
      <div className="col-span-2 bg-secondary py-10 rounded-md px-5 space-y-3">
        <h4 className="text-xl text-secondary-foreground flex justify-between items-center">
          Distro Balance
          <HugeiconsIcon icon={CreditCardIcon} />
        </h4>
        <h2 className="text-4xl font-black text-green-500">$25.50</h2>
        <div className="grid grid-cols-2 gap-5">
          <PaymentDialog
            triggerBtn={
              <PaymentTriggerBtn variant="ghost" className="w-full" asChild>
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
