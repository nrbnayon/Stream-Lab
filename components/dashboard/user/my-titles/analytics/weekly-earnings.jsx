// components/dashboard/user/my-titles/analytics/weekly-earnings.jsx
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

export default function WeeklyEarnings({ filmId }) {
  const { data: analyticsData, isLoading } =
    useGetMyTitlesAnalyticsQuery(filmId);

  const weeklyEarnings = analyticsData?.weekly_earnings || [];
  const maxEarning = Math.max(...weeklyEarnings.map((week) => week.earning), 1);

  const formatWeek = (weekStart, weekEnd) => {
    const start = new Date(weekStart);
    const end = new Date(weekEnd);
    return `${start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} - ${end.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Earnings (Last 7 Weeks)</CardTitle>
        <CardDescription>Revenue trends over time</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex gap-3 items-center">
                <div className="w-24 h-4 bg-muted animate-pulse rounded"></div>
                <div className="flex-1 h-2 bg-muted animate-pulse rounded"></div>
                <div className="w-12 h-4 bg-muted animate-pulse rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          weeklyEarnings.map((week, i) => (
            <div
              key={i}
              className="flex justify-between items-center gap-5 text-secondary-foreground mb-0.5"
            >
              <p className="grow text-sm">
                {formatWeek(week.week_start, week.week_end)}
              </p>
              <div className="grow flex items-center gap-3">
                <Progress
                  value={maxEarning > 0 ? (week.earning / maxEarning) * 100 : 0}
                  className="max-w-md"
                  color="green"
                />
                <p className="w-12 text-right">${week.earning?.toFixed(2)}</p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
