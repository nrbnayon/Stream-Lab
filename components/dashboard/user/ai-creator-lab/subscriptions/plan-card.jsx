// components\dashboard\user\ai-creator-lab\subscriptions\plan-card.jsx
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  useCreateStripeSubscriptionCheckoutMutation,
  useCreatePayPalSubscriptionCheckoutMutation,
  useCreateReelBuxSubscriptionCheckoutMutation,
} from "@/redux/store/api/paymentApi";

export default function PlanCard({ subscriptionPlan }) {
  const { isHighlighted, icon, name, price, features } = subscriptionPlan;
  const router = useRouter();

  const [paymentData, setPaymentData] = useState({
    payment_method: "",
    plan_name: name,
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Subscription mutations
  const [createStripeSubscriptionCheckout] =
    useCreateStripeSubscriptionCheckoutMutation();
  const [createPayPalSubscriptionCheckout] =
    useCreatePayPalSubscriptionCheckoutMutation();
  const [createReelBuxSubscriptionCheckout] =
    useCreateReelBuxSubscriptionCheckoutMutation();

  // Handle payment processing
  const handlePayment = async (e) => {
    e.preventDefault();

    if (!paymentData.payment_method) {
      toast.error("Please select a payment method");
      return;
    }

    setLoading(true);

    try {
      const subscriptionData = {
        payment_type: "subscribe",
        plan: name,
        duration_days: "30",
        limit_value: getLimitValue(name),
      };

      let response;

      switch (paymentData.payment_method) {
        case "card":
          response = await createStripeSubscriptionCheckout(
            subscriptionData
          ).unwrap();
          if (response?.checkoutUrl) {
            window.location.href = response.checkoutUrl;
          }
          break;

        case "paypal":
          const paypalData = {
            plan: name,
            duration_days: 30,
            limit_value: getLimitValue(name),
          };
          response = await createPayPalSubscriptionCheckout(
            paypalData
          ).unwrap();
          if (response?.approvalUrl) {
            window.location.href = response.approvalUrl;
          }
          break;

        case "wallet":
          const reelBuxData = {
            plan: name,
            duration_days: 30,
            limit_value: getLimitValue(name),
          };
          response = await createReelBuxSubscriptionCheckout(
            reelBuxData
          ).unwrap();
          if (response?.message) {
            toast.success(response.message);
            // Refresh the page or redirect to subscription page
            setTimeout(() => {
              router.refresh();
            }, 1500);
          }
          break;

        default:
          toast.error("Invalid payment method selected");
          break;
      }
    } catch (error) {
      console.error("Subscription error:", error);

      // Handle specific error messages
      if (error?.data?.message) {
        if (
          error.data.message.includes("already have an active subscription")
        ) {
          toast.info("You already have an active subscription.");
        } else {
          toast.error(error.data.message);
        }
      } else {
        toast.error("Subscription failed. Please try again.");
      }
    } finally {
      setLoading(false);
      setOpen(false);
      setPaymentData({ payment_method: "", plan_name: name });
    }
  };

  // Get limit value based on plan name
  const getLimitValue = (planName) => {
    switch (planName.toLowerCase()) {
      case "starter":
        return "5";
      case "pro":
        return "10";
      case "enterprise":
        return "50";
      default:
        return "10";
    }
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
                    <SelectItem value="card">Card (Stripe)</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="wallet">ReelBux Wallet</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button
                type="submit"
                disabled={!paymentData.payment_method || loading}
              >
                {loading ? "Processing..." : "Pay Now"}
              </Button>
            </form>
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  );
}
