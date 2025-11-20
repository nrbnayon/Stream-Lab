"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { HugeiconsIcon } from "@hugeicons/react";
import { Crown03Icon } from "@hugeicons/core-free-icons/index";
import { cn } from "@/lib/utils";
import UpgradePlan from "./upgrade-plan";
import {
  useCancelSubscriptionMutation,
  useGetMySubscriptionQuery,
} from "@/redux/store/api/paymentApi";

const formatDate = (value) => {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return value;
  }
};

export default function SubscriptionStatus({
  className,
  showUpgradeCta = false,
}) {
  const {
    data: subscription,
    isFetching,
    isError,
    error,
  } = useGetMySubscriptionQuery();
  const [cancelSubscription, { isLoading: isCancelling }] =
    useCancelSubscriptionMutation();
  const [cancelNow, setCancelNow] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  const hasSubscription = Boolean(subscription?.status);

  const usagePercent = useMemo(() => {
    if (!subscription?.limit_value) return 0;
    return Math.min(
      (Number(subscription.used_value || 0) /
        Number(subscription.limit_value || 1)) *
        100,
      100
    );
  }, [subscription]);

  const handleCancel = async () => {
    try {
      const payload = cancelNow ? { cancel_now: true } : {};
      const response = await cancelSubscription(payload).unwrap();
      toast.success(
        response?.message ||
          (cancelNow
            ? "Subscription canceled immediately."
            : "Subscription will be canceled at the end of the current period.")
      );
      setDialogOpen(false);
    } catch (err) {
      toast.error(
        err?.data?.message ||
          "Unable to cancel subscription right now. Please try again."
      );
    }
  };

  if (isFetching) {
    return (
      <Card className={cn("my-4", className)}>
        <CardHeader>
          <CardTitle>Checking your subscription...</CardTitle>
          <CardDescription>
            We&apos;re loading your current AI Creator Lab plan details.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!hasSubscription || (isError && error?.status === 404)) {
    return (
      <Card className={cn("my-4", className)}>
        <CardHeader>
          <CardTitle>No Active AI Subscription</CardTitle>
          <CardDescription>
            Upgrade to unlock more generations, higher limits, and faster
            processing times.
          </CardDescription>
        </CardHeader>
        {showUpgradeCta && (
          <CardFooter>
            <UpgradePlan />
          </CardFooter>
        )}
      </Card>
    );
  }

  return (
    <Card className={cn("my-4", className)}>
      <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon icon={Crown03Icon} className="text-primary" />
            {subscription?.plan_name ?? "Subscription"}
          </CardTitle>
          <CardDescription className="capitalize">
            {subscription?.status ?? "active"} • Billed via{" "}
            {subscription?.payment_method ?? "—"}
          </CardDescription>
        </div>
        <div className="text-right">
          <p className="text-xl font-semibold">
            ${subscription?.price ?? "0.00"}
            <span className="text-sm text-secondary-foreground"> /month</span>
          </p>
          <p className="text-sm text-secondary-foreground">
            Current period:{" "}
            <span className="font-medium">
              {formatDate(subscription?.current_period_start)} —{" "}
              {formatDate(subscription?.current_period_end)}
            </span>{" "}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>{subscription?.used_value ?? 0} used</span>
            <span>{subscription?.limit_value ?? 0} total</span>
          </div>
          <Progress value={usagePercent} />
          {subscription?.cancel_at_period_end && (
            <p className="text-xs text-secondary-foreground mt-2">
              This subscription will end on{" "}
              {formatDate(subscription?.current_period_end)}.
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-3">
        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" disabled={isCancelling}>
              Cancel Subscription
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cancel subscription</AlertDialogTitle>
              <AlertDialogDescription>
                Choose whether to cancel immediately or at the end of the
                current billing period.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex items-center space-x-2 rounded-md border p-3">
              <Checkbox
                id="cancel-now"
                checked={cancelNow}
                onCheckedChange={(value) => setCancelNow(Boolean(value))}
              />
              <label htmlFor="cancel-now" className="text-sm leading-none">
                Cancel immediately (unused time will be forfeited)
              </label>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isCancelling}>
                Keep Plan
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleCancel}
                disabled={isCancelling}
                className="bg-primary text-white hover:bg-primary/90"
              >
                {isCancelling ? "Canceling..." : "Confirm Cancellation"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {showUpgradeCta && <UpgradePlan />}
      </CardFooter>
    </Card>
  );
}
