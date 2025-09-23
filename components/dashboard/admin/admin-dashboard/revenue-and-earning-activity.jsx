'use client'
import { useGetAdminDashboardQuery } from "@/redux/store/api/adminApi";
import EarningActivity from "./earning-activity";
import MonthlyRevenue from "./monthly-revenue";

export default function RevenueAndEarningActivity() {
    const { data: dashboardResponse, isLoading } = useGetAdminDashboardQuery();
    // console.log("dashboardResponse stats::", dashboardResponse);
  return (
    <div className="my-5 grid grid-cols-1 lg:grid-cols-4 gap-3 md:gap-5">
      <MonthlyRevenue
        dashboardResponse={dashboardResponse}
        isLoading={isLoading}
      />
      <EarningActivity
        dashboardResponse={dashboardResponse}
        isLoading={isLoading}
      />
    </div>
  );
}
