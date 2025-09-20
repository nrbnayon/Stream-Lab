// app/(roles)/(user)/my-titles/analytics/[id]/page.jsx
import AnalyticsHeading from "@/components/dashboard/user/my-titles/analytics-heading";
import DailyViews from "@/components/dashboard/user/my-titles/analytics/daily-views";
import RevenueBreakdown from "@/components/dashboard/user/my-titles/analytics/revenue-breakdown";
import AnalyticsStats from "@/components/dashboard/user/my-titles/analytics/stats";
import WatchTime from "@/components/dashboard/user/my-titles/analytics/watch-time";
import WeeklyEarnings from "@/components/dashboard/user/my-titles/analytics/weekly-earnings";

export default async function FilmAnalyticsPage({ params }) {
  const { id } = await params;

  return (
    <>
      <AnalyticsHeading filmId={id} />
      <AnalyticsStats filmId={id} />
      <div className="my-5 grid lg:grid-cols-2 gap-5">
        <DailyViews filmId={id} />
        <WeeklyEarnings filmId={id} />
      </div>
      <div className="my-5 grid lg:grid-cols-2 gap-5">
        <WatchTime filmId={id} />
        <RevenueBreakdown filmId={id} />
      </div>
    </>
  );
}
