// app/(roles)/(user)/ai-creator-lab/(use-ai)/generate-and-analyze/page.jsx
"use client";

import AiInput from "@/components/dashboard/user/ai-creator-lab/generate-and-analyze/ai-input";
import TabNavigation from "@/components/dashboard/user/ai-creator-lab/generate-and-analyze/tab-navigation";
import RecentGeneration from "@/components/dashboard/user/ai-creator-lab/recent-generation";
import SubscriptionStatus from "@/components/dashboard/user/ai-creator-lab/subscriptions/subscription-status";
import Pagination from "@/components/dashboard/user/ai-creator-lab/pagination";
import { useGetRecentGenerationsQuery } from "@/redux/store/api/aiCreatorApi";
import { mergeGenerationLists } from "@/lib/ai-creator-lab";
import { useRouter } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";

export default function GenerateAndAnalyzePage() {
  const [activeTab, setActiveTab] = useState("video");
  const [recentGenerations, setRecentGenerations] = useState({
    video: [],
    image: [],
    script: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const router = useRouter();

  // console.log("Local recentGenerations:", recentGenerations);

  // Get tab from query params manually
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab") || "video";
      setActiveTab(tab);
      setCurrentPage(1);
    }
  }, []);

  // Update query params when tab changes
  const handleTabChange = useCallback(
    (tab) => {
      setActiveTab(tab);
      setCurrentPage(1);
      const params = new URLSearchParams(window.location.search);
      params.set("tab", tab);
      router.push(`/ai-creator-lab/generate-and-analyze?${params.toString()}`);
    },
    [router]
  );

  const {
    data: response,
    isFetching: isRecentLoading,
    isError,
    refetch,
  } = useGetRecentGenerationsQuery(
    { taskType: activeTab, page: currentPage, pageSize },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const serverGenerations = response?.data || [];
  const pagination = response?.pagination || null;

  // console.log("Server generations from API:", serverGenerations);
  // console.log("Pagination info:", pagination);
  // console.log("Is loading:", isRecentLoading);
  // console.log("Is error:", isError);

  // Check if there are any processing items
  const hasProcessingItems = useMemo(
    () => serverGenerations.some((gen) => gen?.status === "processing"),
    [serverGenerations]
  );

  // Auto-refetch when there are processing items
  useEffect(() => {
    if (hasProcessingItems) {
      const interval = setInterval(() => {
        refetch();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [hasProcessingItems, refetch]);

  const handleGenerationComplete = useCallback(
    (generation) => {
      if (!generation) return;
      // console.log("New generation completed:", generation);

      // Immediately refetch to get the latest data from server
      refetch();

      // Continue polling if status is processing
      if (generation?.status === "processing") {
        const pollInterval = setInterval(() => {
          refetch();
        }, 3000);

        // Stop polling after 2 minutes
        setTimeout(() => {
          clearInterval(pollInterval);
        }, 120000);
      }
    },
    [refetch]
  );

  const mergedGenerations = useMemo(() => {
    const groupedServer = {
      video: serverGenerations.filter((gen) => gen.task_type === "video"),
      image: serverGenerations.filter((gen) => gen.task_type === "image"),
      script: serverGenerations.filter((gen) => gen.task_type === "script"),
    };

    return {
      video: mergeGenerationLists(recentGenerations.video, groupedServer.video),
      image: mergeGenerationLists(recentGenerations.image, groupedServer.image),
      script: mergeGenerationLists(
        recentGenerations.script,
        groupedServer.script
      ),
    };
  }, [recentGenerations, serverGenerations]);

  // console.log("Merged generations:", mergedGenerations);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <SubscriptionStatus showUpgradeCta className="my-4" />
      <Suspense fallback={<div>Loading...</div>}>
        <TabNavigation
          activeTab={activeTab}
          handleTabChange={handleTabChange}
        />
      </Suspense>
      <AiInput
        activeTab={activeTab}
        onGenerationComplete={handleGenerationComplete}
      />
      <RecentGeneration
        activeTab={activeTab}
        recentGenerations={mergedGenerations}
        isLoading={isRecentLoading}
        showAllTypes={false}
      />
      {pagination && (
        <Pagination
          currentPage={pagination.current_page}
          totalPages={pagination.total_pages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}