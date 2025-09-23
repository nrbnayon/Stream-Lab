// components\dashboard\admin\payment\stats.jsx
"use client";
import { useGetAdminPaymentsQuery } from "@/redux/store/api/adminApi";
import StatsCard from "../stats-card";
import {
  Dollar01Icon,
  Loading03Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons/index";

export default function AdminPaymentsStats() {
  const { data: paymentsResponse, isLoading } = useGetAdminPaymentsQuery();
  const stats = paymentsResponse?.stats || {};

  console.log("Payment section data:: ", paymentsResponse, "Stats::", stats);

  const adminPaymentsStats = [
    {
      heading: "Completed Earnings",
      value: stats.total_completed_earning || 0,
      icon: Dollar01Icon,
      isDollar: true,
      isGreen: true,
    },
    {
      heading: "Pending Earnings",
      value: stats.total_pending_earning || 0,
      icon: Loading03Icon,
      isDollar: true,
      isGreen: true,
    },
    {
      heading: "Failed Earnings",
      value: stats.total_failed_earning || 0,
      icon: Cancel01Icon,
      isDollar: true,
      isGreen: true,
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 lg:gap-5 my-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-secondary animate-pulse rounded-md h-24"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 lg:gap-5 my-5">
      {adminPaymentsStats.map((stat, i) => (
        <StatsCard key={i} stat={stat} />
      ))}
    </div>
  );
}
