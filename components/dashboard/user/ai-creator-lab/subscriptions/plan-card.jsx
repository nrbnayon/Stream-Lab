"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loading03Icon, Tick01Icon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
export default function PlanCard({ subscriptionPlan }) {
  const { isHighlighted, icon, name, price, features } = subscriptionPlan;
  const [paymentData, setPaymentData] = useState({
    payment_method: "",
    plan_name: name,
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // TODO: Pay here
  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(paymentData);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
    setOpen(false);
    setPaymentData({ payment_method: "", plan_name: name });
  };
  return (
    <Card
      className={`${
        isHighlighted ? "border-primary mt-3 md:mt-0 pt-7" : ""
      } relative`}
    >
      {isHighlighted && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground rounded-md h-8 px-3 flex items-center ">
          Most Popular
        </span>
      )}
      <CardHeader>
        <CardDescription className="flex gap-3 justify-center items-center">
          <span>{icon}</span>
          <span>{name}</span>
        </CardDescription>
        <CardTitle className="text-center">
          ${price}
          <span className="text-secondary-foreground">/month</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {features.map((feature, i) => (
          <p key={i} className="flex gap-3">
            <HugeiconsIcon icon={Tick01Icon} className="text-green-500" />
            <span>{feature}</span>
          </p>
        ))}

        {/* Choosing payment method */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              className="w-full mt-3"
              variant={isHighlighted ? "default" : "secondary"}
              disabled={loading}
            >
              {loading ? (
                <HugeiconsIcon
                  icon={Loading03Icon}
                  className="animate-spin [animation-duration:1.5s]"
                />
              ) : (
                <span>Choose {name}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <form className="flex gap-2" onSubmit={handlePayment}>
              <Select
                value={paymentData.payment_method}
                onValueChange={(value) =>
                  setPaymentData({ ...paymentData, payment_method: value })
                }
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Payment Method?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="card">card</SelectItem>
                    <SelectItem value="paypal">paypal</SelectItem>
                    <SelectItem value="wallet">wallet</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button disabled={!paymentData.payment_method}>Pay Now</Button>
            </form>
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  );
}
