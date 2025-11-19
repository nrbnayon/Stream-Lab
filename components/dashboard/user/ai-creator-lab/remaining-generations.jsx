"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ZapIcon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import { useGetAiUsageQuery } from "@/redux/store/api/aiCreatorApi";

export default function RemainingGenerations() {
  const { data, isFetching, isError } = useGetAiUsageQuery();

  const subscriptionActive = (data?.subscription?.limit ?? 0) > 0;
  const usageSource = subscriptionActive
    ? data?.subscription
    : data?.free ?? { limit: 3, used: 0, remaining: 3 };

  const generationLimit = usageSource?.limit ?? 0;
  const consumedGenerations =
    generationLimit > 0
      ? Math.min(Number(usageSource?.used ?? 0), generationLimit)
      : Number(usageSource?.used ?? 0);
  const remainingGenerations =
    usageSource?.remaining ??
    Math.max(generationLimit - Number(usageSource?.used ?? 0), 0);

  const progressValue =
    generationLimit > 0
      ? Math.min((consumedGenerations / generationLimit) * 100, 100)
      : 0;

  const headingText = subscriptionActive
    ? `${
        data?.subscription?.plan_name || "Subscription"
      } Image, Script Analysis & Video Quota`
    : "Free Image, Script Analysis & Video Quota";

  const descriptionText = isError
    ? "Unable to load your quota right now"
    : `${remainingGenerations} of ${generationLimit} ${
        subscriptionActive ? "subscription" : "free"
      } generations remaining this month`;

  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle className="flex gap-1">
          <HugeiconsIcon icon={ZapIcon} className="mt-1" />
          {headingText}
        </CardTitle>
        <CardDescription>
          {isFetching ? "Checking your quota..." : descriptionText}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Progress
          value={progressValue}
          color={remainingGenerations === 0 ? "red" : "primary"}
        />
      </CardContent>
    </Card>
  );
}
