"use client"
import { useGetAdminDashboardQuery } from "@/redux/store/api/adminApi";
import StatsCard from "../stats-card";
import {
  UserIcon,
  ViewIcon,
  Dollar01Icon,
  CreditCardIcon,
} from "@hugeicons/core-free-icons/index";

export default function AdminDashboardStats() {
  const { data: dashboardResponse, isLoading } = useGetAdminDashboardQuery();
  const stats = dashboardResponse?.stats || {};

  const adminDashboardStats = [
    {
      heading: "Total Users",
      value: stats.total_users || 0,
      icon: UserIcon,
    },
    {
      heading: "Total Views",
      value: stats.total_views || 0,
      icon: ViewIcon,
    },
    {
      heading: "Total Earning",
      value: stats.total_earning || 0,
      icon: Dollar01Icon,
      isDollar: true,
      isGreen: true,
    },
    {
      heading: "Subscription Earning",
      value: stats.subscription_earning || 0,
      icon: CreditCardIcon,
      isDollar: true,
      isGreen: true,
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-5 my-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-secondary animate-pulse rounded-md h-24"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-5 my-5">
      {adminDashboardStats.map((stat, i) => (
        <StatsCard key={i} stat={stat} />
      ))}
    </div>
  );
}
