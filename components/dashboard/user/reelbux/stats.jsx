import { CreditCardIcon, PlusSignIcon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import PaymentDialog from "../../payment-dialog";
import { Button } from "@/components/ui/button";

export default function ReelbuxBalanceStats() {
  return (
    <div className="my-5 bg-secondary py-10 px-5 rounded-md">
      <span className="flex gap-2 items-center">
        <HugeiconsIcon icon={CreditCardIcon} size={30} />
        <h4 className="font-semibold text-2xl">ReelBux Balance</h4>
      </span>
      <div className="mt-5 flex justify-between items-end">
        <h2 className="text-5xl font-black grow w-full">$156.52</h2>
        <PaymentDialog
          inputDisabled={false}
          intention="add"
          dialogTitle="Add Fund"
          intentionBtnText="Add"
          //  TODO: pass the api endpoint from here
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
