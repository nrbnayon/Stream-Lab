"use client";
import InputField from "@/components/input-field";
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
import { MasterCardIcon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import { usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../ui/select";

export default function PaymentDialog({
  triggerBtn,
  payBtnText,
  dialogTitle = "",
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
          <DialogHeader className="mb-2">
            <DialogTitle> {dialogTitle} </DialogTitle>
          </DialogHeader>
          <div>
            <h4 className="font-medium">Amount ($)</h4>
            <InputField
              type="number"
              inputDisabled={inputDisabled}
              defaultValue={inputValue}
              min={1}
            />
            {dialogTitle.includes("Rent") && (
              <div>
                <h4 className="font-medium">Rent Time</h4>
                <Select>
                  <SelectTrigger></SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value=""></SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
            <RadioGroup className="my-3" defaultValue="card">
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
