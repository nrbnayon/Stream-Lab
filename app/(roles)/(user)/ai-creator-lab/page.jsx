// app/(roles)/(user)/ai-creator-lab/page.jsx
"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import GenerationCards from "@/components/dashboard/user/ai-creator-lab/generation-cards";
import RecentGeneration from "@/components/dashboard/user/ai-creator-lab/recent-generation";
import RemainingGenerations from "@/components/dashboard/user/ai-creator-lab/remaining-generations";
import UpgradePlan from "@/components/dashboard/user/ai-creator-lab/subscriptions/upgrade-plan";
import SubscriptionStatus from "@/components/dashboard/user/ai-creator-lab/subscriptions/subscription-status";
import Pagination from "@/components/dashboard/user/ai-creator-lab/pagination";
import { useGetRecentGenerationsQuery } from "@/redux/store/api/aiCreatorApi";

export default function AICreatorLab() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  const {
    data: response,
    isFetching: isRecentLoading,
    isError,
    refetch,
  } = useGetRecentGenerationsQuery(
    { page: currentPage, pageSize },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const currentServerGenerations = response?.data || [];
  const pagination = response?.pagination || null;

  // console.log("serverGenerations from API:", currentServerGenerations);
  // console.log("Pagination info:", pagination);
  // console.log("Is loading:", isRecentLoading);
  // console.log("Is error:", isError);

  const hasProcessingItems = useMemo(
    () => currentServerGenerations.some((gen) => gen?.status === "processing"),
    [currentServerGenerations]
  );

  // console.log("Has processing items:", hasProcessingItems);

  // Auto-refetch when there are processing items
  useEffect(() => {
    if (hasProcessingItems) {
      const interval = setInterval(() => {
        refetch();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [hasProcessingItems, refetch]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="flex gap-5 justify-between items-center flex-wrap">
        <span>
          <h2 className="text-3xl md:text-4xl font-medium">
            Bring Your Story to Life
          </h2>
          <p className="text-secondary-foreground max-w-3xl">
            Creator Lab. JusB’s toolkit for building pitch materials, visuals,
            and development assets.
          </p>
        </span>
        <UpgradePlan />
      </div>

      <SubscriptionStatus />
      <RemainingGenerations />
      <GenerationCards />
      <RecentGeneration
        recentGenerations={currentServerGenerations}
        isLoading={isRecentLoading}
        showAllTypes={true}
      />

      {pagination && (
        <Pagination
          currentPage={pagination.current_page}
          totalPages={pagination.total_pages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}
