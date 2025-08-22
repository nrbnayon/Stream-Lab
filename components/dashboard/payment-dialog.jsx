"use client";
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
import { Input } from "../ui/input";
import { useState } from "react";

export default function PaymentDialog({
  intention = "",
  triggerBtn,
  intentionBtnText = "",
  dialogTitle = "",
  dialogDescription = "",
  inputDisabled = true,
  inputValue,
  apiEndPoint,
}) {
  const pathName = usePathname();
  const [amount, setAmount] = useState(inputValue);
  const [errorMessage, setErrorMessage] = useState("");
  const systemPayOption = intention === "add" ? "Distro" : "ReelBux";

  return (
    <Dialog>
      <DialogTrigger>{triggerBtn}</DialogTrigger>
      <DialogContent>
        <form>
          <DialogHeader className="my-3">
            <DialogTitle> {dialogTitle} </DialogTitle>
            {dialogDescription && (
              <DialogDescription>{dialogDescription}</DialogDescription>
            )}
          </DialogHeader>
          <div className="space-y-3">
            {/* NOTE: Amount and rent time */}
            <div className="flex gap-3">
              {/* NOTE: Amount Field */}
              <div className="grow">
                <Label>Amount ($)</Label>
                <Input
                  type="number"
                  disabled={inputDisabled}
                  min={1}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              {/* NOTE: If for rent - select rent time */}
              {intention === "rent" && (
                <div>
                  <Label>Rent Time</Label>
                  <Select>
                    <SelectTrigger>Select time</SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="4">4 hours</SelectItem>
                        <SelectItem value="6">6 hours</SelectItem>
                        <SelectItem value="12">12 hours</SelectItem>
                        <SelectItem value="24">24 hours</SelectItem>
                        <SelectItem value="48">48 hours</SelectItem>
                        <SelectItem value="72">72 hours</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* NOTE: Show source if not case is transfer  */}
            {intention !== "transfer" && (
              <RadioGroup
                // className="my-3"
                defaultValue={systemPayOption.toLowerCase()}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card"> Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal"> PayPal</Label>
                </div>
                {/* NOTE: System Pay Option */}
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={systemPayOption.toLowerCase()}
                    id={systemPayOption}
                  />
                  <Label htmlFor={systemPayOption}>{systemPayOption}</Label>
                </div>
              </RadioGroup>
            )}

            {/* NOTE: Show error here */}
            {/* TODO: change condition */}
            {intention === "rent" && (
              <p className="text-destructive text-center">
                You don&apos;t have enough balance
              </p>
            )}
          </div>
          <DialogFooter>
            {/* TODO: change disable condition */}
            <Button className="w-full my-3" disabled={errorMessage}>
              {intentionBtnText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
