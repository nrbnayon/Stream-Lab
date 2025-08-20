import AnalyticsHeading from "@/components/dashboard/user/my-titles/analytics-heading";
import DailyViews from "@/components/dashboard/user/my-titles/analytics/daily-views";
import RevenueBreakdown from "@/components/dashboard/user/my-titles/analytics/revenue-breakdown";
import AnalyticsStats from "@/components/dashboard/user/my-titles/analytics/stats";
import WatchTime from "@/components/dashboard/user/my-titles/analytics/watch-time";
import WeeklyEarnings from "@/components/dashboard/user/my-titles/analytics/weekly-earnings";

export default async function FilmAnalyticsPage({ params }) {
  const { id } = params;

  return (
    <>
      <AnalyticsHeading movieName="Movie Name" />
      <AnalyticsStats />
      <div className="my-5 grid lg:grid-cols-2 gap-5">
        <DailyViews />
        <WeeklyEarnings />
      </div>
      <div className="my-5 grid lg:grid-cols-2 gap-5">
        <WatchTime />
        <RevenueBreakdown />
      </div>
    </>
  );
}
