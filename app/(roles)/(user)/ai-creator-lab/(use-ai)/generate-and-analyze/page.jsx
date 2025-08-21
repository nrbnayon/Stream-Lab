"use client";

import AiInput from "@/components/dashboard/user/ai-creator-lab/generate-and-analyze/ai-input";
import TabNavigation from "@/components/dashboard/user/ai-creator-lab/generate-and-analyze/tab-navigation";
import RecentGeneration from "@/components/dashboard/user/ai-creator-lab/recent-generation";
import { useRouter } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

export default function GenerateAndAnalyzePage() {
  const [activeTab, setActiveTab] = useState("video");
  const router = useRouter();

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

  return (
    <div>
      {/* Tab navigation */}
      <Suspense fallback={<div>Loading...</div>}>
        <TabNavigation
          activeTab={activeTab}
          handleTabChange={handleTabChange}
        />
      </Suspense>
      {/* AI input */}
      <AiInput activeTab={activeTab} />
      {/* Recent Generation */}
      <RecentGeneration />
    </div>
  );
}
