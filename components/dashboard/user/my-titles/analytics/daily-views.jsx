// components/dashboard/user/my-titles/analytics/daily-views.jsx
"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useGetMyTitlesAnalyticsQuery } from "@/redux/store/api/filmsApi";

export default function DailyViews({ filmId }) {
  const { data: analyticsData, isLoading } =
    useGetMyTitlesAnalyticsQuery(filmId);

  const dailyViews = analyticsData?.daily_views || [];
  const maxViews = Math.max(...dailyViews.map((day) => day.views), 1);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Views (Last 7 Days)</CardTitle>
        <CardDescription>View trends over the past week</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex gap-3 items-center">
                <div className="w-16 h-4 bg-muted animate-pulse rounded"></div>
                <div className="flex-1 h-2 bg-muted animate-pulse rounded"></div>
                <div className="w-8 h-4 bg-muted animate-pulse rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          dailyViews.map((day, i) => (
            <div
              key={i}
              className="flex justify-between items-center gap-5 text-secondary-foreground mb-0.5"
            >
              <p className="grow w-16">{formatDate(day.date)}</p>
              <div className="grow flex items-center gap-3">
                <Progress
                  value={maxViews > 0 ? (day.views / maxViews) * 100 : 0}
                  className="max-w-md"
                />
                <p className="w-10 text-right">{day.views}</p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
