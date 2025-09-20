// components/dashboard/user/my-titles/analytics/watch-time.jsx
"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetMyTitlesAnalyticsQuery } from "@/redux/store/api/filmsApi";

export default function WatchTime({ filmId }) {
  const { data: analyticsData, isLoading } =
    useGetMyTitlesAnalyticsQuery(filmId);

  const formatWatchTime = (seconds) => {
    if (!seconds) return "0s";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle>Average Watch Time</CardTitle>
        <CardDescription>Average time viewers spend watching</CardDescription>
      </CardHeader>
      <CardContent className="text-4xl font-bold text-primary">
        {isLoading
          ? "Loading..."
          : formatWatchTime(analyticsData?.average_watch_time_seconds)}
      </CardContent>
    </Card>
  );
}
