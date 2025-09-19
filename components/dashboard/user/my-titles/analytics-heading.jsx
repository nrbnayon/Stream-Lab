// components/dashboard/user/my-titles/analytics-heading.jsx
"use client";

import { ArrowLeft02Icon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import { useGetMyTitlesAnalyticsQuery } from "@/redux/store/api/filmsApi";
import { useRouter } from "next/navigation";

export default function AnalyticsHeading({ filmId }) {
  const router = useRouter();
  const { data: analyticsData, isLoading } =
    useGetMyTitlesAnalyticsQuery(filmId);

  const movieName = analyticsData?.film || "Loading...";

  const handleBack = () => {
    router.back();
  };

  return (
    <h2 className="text-2xl md:text-3xl lg:text-4xl flex gap-5">
      <HugeiconsIcon
        icon={ArrowLeft02Icon}
        className="transition-transform hover:-translate-x-1 cursor-pointer size-7 mt-0.5"
        onClick={handleBack}
      />
      {isLoading ? "Loading..." : movieName} — Analytics
    </h2>
  );
}
