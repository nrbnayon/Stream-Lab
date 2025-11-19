"use client";
import { useMemo } from "react";
import GenerationCards from "@/components/dashboard/user/ai-creator-lab/generation-cards";
import RecentGeneration from "@/components/dashboard/user/ai-creator-lab/recent-generation";
import RemainingGenerations from "@/components/dashboard/user/ai-creator-lab/remaining-generations";
import UpgradePlan from "@/components/dashboard/user/ai-creator-lab/subscriptions/upgrade-plan";
import SubscriptionStatus from "@/components/dashboard/user/ai-creator-lab/subscriptions/subscription-status";
import { useGetRecentGenerationsQuery } from "@/redux/store/api/aiCreatorApi";
import { groupGenerationsByType } from "@/lib/ai-creator-lab";

export default function AICreatorLab() {
  const {
    data: serverGenerations = [],
    isFetching: isRecentLoading,
    isError,
  } = useGetRecentGenerationsQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  console.log("serverGenerations from API:", serverGenerations);
  console.log("Is loading:", isRecentLoading);
  console.log("Is error:", isError);

  const groupedGenerations = useMemo(
    () => groupGenerationsByType(serverGenerations),
    [serverGenerations]
  );

  console.log("Grouped generations:", groupedGenerations);

  return (
    <>
      <div className="flex gap-5 justify-between items-center flex-wrap">
        <span>
          <h2 className="text-3xl md:text-4xl font-medium">
            Bring Your Story to Life
          </h2>
          <p className="text-secondary-foreground max-w-3xl">
            CreatorLab is JusB's AI-powered toolkit for filmmakers and
            creators—featuring image generation, video generation, and script
            analysis. Use these tools to create pitch decks, social media
            content, get detailed notes on your script or create whatever
            content you may need for your project!
          </p>
        </span>
        <UpgradePlan />
      </div>

      <SubscriptionStatus />
      <RemainingGenerations />
      <GenerationCards />
      <RecentGeneration
        recentGenerations={groupedGenerations}
        isLoading={isRecentLoading}
      />
    </>
  );
}
