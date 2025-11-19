"use client";

import AiInput from "@/components/dashboard/user/ai-creator-lab/generate-and-analyze/ai-input";
import TabNavigation from "@/components/dashboard/user/ai-creator-lab/generate-and-analyze/tab-navigation";
import RecentGeneration from "@/components/dashboard/user/ai-creator-lab/recent-generation";
import SubscriptionStatus from "@/components/dashboard/user/ai-creator-lab/subscriptions/subscription-status";
import { useGetRecentGenerationsQuery } from "@/redux/store/api/aiCreatorApi";
import {
  groupGenerationsByType,
  mergeGenerationLists,
} from "@/lib/ai-creator-lab";
import { useRouter } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";

export default function GenerateAndAnalyzePage() {
  const [activeTab, setActiveTab] = useState("video");
  const [recentGenerations, setRecentGenerations] = useState({
    video: [],
    image: [],
    script: [],
  });
  const router = useRouter();

  console.log("Local recentGenerations:", recentGenerations);

  // Get tab from query params manually
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setActiveTab(params.get("tab") || "video");
    }
  }, []);

  // Update query params when tab changes
  const handleTabChange = useCallback(
    (tab) => {
      setActiveTab(tab);
      const params = new URLSearchParams(window.location.search);
      params.set("tab", tab);
      router.push(`/ai-creator-lab/generate-and-analyze?${params.toString()}`);
    },
    [router]
  );

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

  console.log("Server generations from API:", serverGenerations);
  console.log("Is loading:", isRecentLoading);
  console.log("Is error:", isError);

  const groupedServerGenerations = useMemo(
    () => groupGenerationsByType(serverGenerations),
    [serverGenerations]
  );

  console.log("Grouped server generations:", groupedServerGenerations);

  const handleGenerationComplete = useCallback((generation) => {
    if (!generation) return;
    console.log("New generation completed:", generation);
    setRecentGenerations((prev) => {
      const taskType = generation?.task_type || "video";
      const existing = prev[taskType] || [];
      return {
        ...prev,
        [taskType]: [generation, ...existing].slice(0, 6),
      };
    });
  }, []);

  const mergedGenerations = useMemo(() => {
    return {
      video: mergeGenerationLists(
        recentGenerations.video,
        groupedServerGenerations.video
      ),
      image: mergeGenerationLists(
        recentGenerations.image,
        groupedServerGenerations.image
      ),
      script: mergeGenerationLists(
        recentGenerations.script,
        groupedServerGenerations.script
      ),
    };
  }, [recentGenerations, groupedServerGenerations]);

  console.log("Merged generations:", mergedGenerations);

  return (
    <div>
      <SubscriptionStatus showUpgradeCta className="my-4" />
      {/* Tab navigation */}
      <Suspense fallback={<div>Loading...</div>}>
        <TabNavigation
          activeTab={activeTab}
          handleTabChange={handleTabChange}
        />
      </Suspense>
      {/* AI input */}
      <AiInput
        activeTab={activeTab}
        onGenerationComplete={handleGenerationComplete}
      />
      {/* Recent Generation */}
      <RecentGeneration
        activeTab={activeTab}
        recentGenerations={mergedGenerations}
        isLoading={isRecentLoading}
      />
    </div>
  );
}
