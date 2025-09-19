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
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import InputField from "../input-field";
import { toast } from "sonner";

export default function PaymentDialog({
  intention = "",
  triggerBtn,
  intentionBtnText = "",
  dialogTitle = "",
  dialogDescription = "",
  inputDisabled = true,
  inputValue,
  maxAmount = 0,
  transferAmount,
  setTransferAmount,
  onTransfer,
  isTransferring = false,
}) {
  const systemPayOption = intention === "add" ? "Distro" : "ReelBux";

  const [amount, setAmount] = useState(
    inputValue || (intention === "transfer" ? 10 : 1)
  );
  const [rentTime, setRentTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(systemPayOption);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Use transferAmount and setTransferAmount for transfer intention
  const currentAmount = intention === "transfer" ? transferAmount : amount;
  const setCurrentAmount =
    intention === "transfer" ? setTransferAmount : setAmount;

  // Validation for transfer
  const isValidTransfer = () => {
    if (intention !== "transfer") return true;

    const numAmount = parseFloat(currentAmount);
    if (!currentAmount || isNaN(numAmount) || numAmount <= 0) {
      return false;
    }

    if (numAmount > parseFloat(maxAmount)) {
      return false;
    }

    return true;
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (intention === "transfer") {
      if (!isValidTransfer()) {
        toast.error("Please enter a valid amount");
        return;
      }

      // Call the onTransfer function passed from parent
      try {
        await onTransfer();
        setIsDialogOpen(false); // Close dialog on success
      } catch (error) {
        // Error is handled in the parent component
      }
    } else {
      // Handle other payment types
      console.log("Payment made", {
        amount: currentAmount,
        rentTime,
        paymentMethod,
      });
      setIsDialogOpen(false);
    }
  };

  const getErrorMessage = () => {
    if (intention !== "transfer") return "";

    const numAmount = parseFloat(currentAmount);

    if (!currentAmount || isNaN(numAmount) || numAmount <= 0) {
      return "Please enter a valid amount";
    }

    if (numAmount > parseFloat(maxAmount)) {
      return "Insufficient distro balance";
    }

    return "";
  };

  const errorMessage = getErrorMessage();

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{triggerBtn}</DialogTrigger>
      <DialogContent>
        <form onSubmit={handlePayment}>
          <DialogHeader className="my-3">
            <DialogTitle>{dialogTitle}</DialogTitle>
            {dialogDescription && (
              <DialogDescription>{dialogDescription}</DialogDescription>
            )}
          </DialogHeader>

          <div className="space-y-3">
            {/* Amount and rent time */}
            <div className="flex gap-3">
              {/* Amount Field */}
              <div className="grow">
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  min={intention === "transfer" ? 1 : 1}
                  max={intention === "transfer" ? maxAmount : undefined}
                  step="0.01"
                  disabled={inputDisabled || isTransferring}
                  value={currentAmount}
                  onChange={(e) => setCurrentAmount(e.target.value)}
                  placeholder="Enter amount"
                />
                {intention === "transfer" && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Available: ${parseFloat(maxAmount).toFixed(2)}
                  </p>
                )}
              </div>

              {/* If for rent - select rent time */}
              {intention === "rent" && (
                <div className="min-w-[120px]">
                  <Label>Rent Time</Label>
                  <Select value={rentTime} onValueChange={setRentTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
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

            {/* Show source if not case is transfer */}
            {intention !== "transfer" && (
              <div>
                <Label className="text-sm font-medium">Payment Method</Label>
                <RadioGroup
                  value={paymentMethod.toLowerCase()}
                  onValueChange={(value) => setPaymentMethod(value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>
                  {/* System Pay Option */}
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={systemPayOption.toLowerCase()}
                      id={systemPayOption}
                    />
                    <Label htmlFor={systemPayOption}>{systemPayOption}</Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Show error message */}
            {errorMessage && (
              <p className="text-destructive text-center text-sm">
                {errorMessage}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full my-3"
              disabled={!!errorMessage || isTransferring}
            >
              {isTransferring ? "Processing..." : intentionBtnText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
