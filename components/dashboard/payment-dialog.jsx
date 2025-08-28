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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../ui/select";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import InputField from "../input-field";

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
  const systemPayOption = intention === "add" ? "Distro" : "ReelBux";
  // DEBUG: make changes here
  const [amount, setAmount] = useState(
    inputValue || intention === "transfer" ? 10 : 1
  );
  const [rentTime, setRentTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(systemPayOption);
  const [errorMessage, setErrorMessage] = useState("");

  // TODO: Make action here
  const handlePayment = (e) => {
    e.preventDefault();
    console.log("Payment made", { amount, rentTime, paymentMethod });
  };

  return (
    <Dialog>
      <DialogTrigger>{triggerBtn}</DialogTrigger>
      <DialogContent>
        <form onSubmit={handlePayment}>
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
                <InputField
                  label="Amount ($)"
                  type="number"
                  inputDisabled={inputDisabled}
                  min={intention === "transfer" ? 10 : 1}
                  value={amount}
                  setValue={setAmount}
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
                defaultValue={systemPayOption.toLowerCase()}
                onValueChange={(value) => setPaymentMethod(value)}
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
            {/* DEBUG: change condition */}
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
