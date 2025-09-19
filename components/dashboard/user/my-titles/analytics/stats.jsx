// components/dashboard/user/my-titles/analytics/stats.jsx
"use client";
import {
  Dollar01Icon,
  UserIcon,
  ViewIcon,
} from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import { useGetMyTitlesAnalyticsQuery } from "@/redux/store/api/filmsApi";

export default function AnalyticsStats({ filmId }) {
  const { data: analyticsData, isLoading } =
    useGetMyTitlesAnalyticsQuery(filmId);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-5 my-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-secondary py-5 lg:py-10 px-3 md:px-5 rounded-md space-y-1 animate-pulse"
          >
            <div className="h-6 bg-muted rounded"></div>
            <div className="h-10 bg-muted rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-5 my-5">
      <div className="bg-secondary py-5 lg:py-10 px-3 md:px-5 rounded-md space-y-1">
        <h4 className="text-xl md:text-2xl text-secondary-foreground flex justify-between items-center">
          Total Views
          <HugeiconsIcon icon={ViewIcon} />
        </h4>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black">
          {analyticsData?.total_views || 0}
        </h2>
      </div>
      <div className="bg-secondary py-5 lg:py-10 px-3 md:px-5 rounded-md space-y-1">
        <h4 className="text-xl md:text-2xl text-secondary-foreground flex justify-between items-center">
          Total Earning
          <HugeiconsIcon icon={Dollar01Icon} />
        </h4>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black">
          ${analyticsData?.total_earning?.toFixed(2) || "0.00"}
        </h2>
      </div>
      <div className="bg-secondary py-5 lg:py-10 px-3 md:px-5 rounded-md space-y-1">
        <h4 className="text-xl md:text-2xl text-secondary-foreground flex justify-between items-center">
          Unique Viewers
          <HugeiconsIcon icon={UserIcon} />
        </h4>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black">
          {analyticsData?.unique_viewers || 0}
        </h2>
      </div>
    </div>
  );
}
