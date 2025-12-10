// components/dashboard/admin/payment/withdrawal-stats.jsx
"use client";
import { useGetAdminWithdrawalsQuery } from "@/redux/store/api/adminApi";
import StatsCard from "../stats-card";
import {
  DollarCircleIcon,
  CheckmarkCircle02Icon,
  Invoice01Icon,
} from "@hugeicons/core-free-icons/index";

export default function WithdrawalStats() {
  const { data: withdrawalsResponse, isLoading } = useGetAdminWithdrawalsQuery();
  const summary = withdrawalsResponse?.summary || {};

  const withdrawalStats = [
    {
      heading: "Total Pending Amount",
      value: summary.total_pending_amount || 0,
      icon: DollarCircleIcon,
      isDollar: true,
      isGreen: false,
    },
    {
      heading: "Total Approved Amount",
      value: summary.total_approved_amount || 0,
      icon: CheckmarkCircle02Icon,
      isDollar: true,
      isGreen: true,
    },
    {
      heading: "Total Withdrawals",
      value: summary.total_withdrawals || 0,
      icon: Invoice01Icon,
      isDollar: false,
      isGreen: false,
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
      {withdrawalStats.map((stat, i) => (
        <StatsCard key={i} stat={stat} />
      ))}
    </div>
  );
}
