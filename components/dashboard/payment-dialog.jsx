"use client";
import InputField from "@/components/input-field";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { MasterCardIcon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import { usePathname } from "next/navigation";

export default function PaymentDialog({
  triggerBtn,
  payBtnText,
  dialogTitle,
  inputDisabled,
  inputValue,
  apiEndPoint,
}) {
  const pathName = usePathname();
  return (
    <Dialog>
      <DialogTrigger>{triggerBtn}</DialogTrigger>
      <DialogContent>
        <form>
          <DialogHeader>
            <DialogTitle className="text-2xl"> {dialogTitle} </DialogTitle>
          </DialogHeader>
          <div>
            <h4>Amount ($)</h4>
            <InputField
              type="number"
              inputDisabled={inputDisabled}
              defaultValue={inputValue}
            />
            <RadioGroup className="mt-3" defaultValue="card">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card">
                  <HugeiconsIcon icon={MasterCardIcon} /> Card
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value={pathName.startsWith("reelbux") ? "distro" : "reelbux"}
                  id={pathName.startsWith("reelbux") ? "distro" : "reelbux"}
                />
                <Label
                  htmlFor={
                    pathName.startsWith("reelbux") ? "distro" : "reelbux"
                  }
                >
                  {pathName.startsWith("reelbux") ? "Distro" : "ReelBux"}
                </Label>
              </div>
            </RadioGroup>
          </div>
          <DialogFooter>
            <Button className="w-full">{payBtnText}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
