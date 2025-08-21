"use client";

import AiInput from "@/components/dashboard/user/ai-creator-lab/generate-and-analyze/ai-input";
import TabNavigation from "@/components/dashboard/user/ai-creator-lab/generate-and-analyze/tab-navigation";
import RecentGeneration from "@/components/dashboard/user/ai-creator-lab/recent-generation";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function GenerateAndAnalyzePage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "video";
  const router = useRouter();

  // NOTE: update if query changes
  const handleTabChange = useCallback(
    (tab) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", tab);
      router.push(`/ai-creator-lab/generate-and-analyze?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div>
      {/* Tab navigation */}
      <TabNavigation activeTab={activeTab} handleTabChange={handleTabChange} />
      {/* AI input */}
      <AiInput activeTab={activeTab} />
      {/* Recent Generation */}
      <RecentGeneration />
    </div>
  );
}
