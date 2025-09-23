"use client"
import React from "react";
import StatsCard from "../stats-card";
import { Dollar01Icon, Link05Icon } from "@hugeicons/core-free-icons/index";
import { useGetAdminDistroReportQuery } from "@/redux/store/api/adminApi";

export default function AdminDistroStats() {
   const { data: distroResponse, isLoading } = useGetAdminDistroReportQuery();

  const adminDistroStats = [
    {
      heading: "Total Earnings",
      value: distroResponse?.total_earning || 0,
      icon: Dollar01Icon,
      isDollar: true,
      isGreen: true,
    },
    {
      heading: "Total Clicks",
      value: distroResponse?.total_clicks || 0,
      icon: Link05Icon,
      isDollar: false,
      isGreen: true,
    },
  ];

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 gap-2 md:gap-3 lg:gap-5 my-5">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="bg-secondary animate-pulse rounded-md h-24"
          ></div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid md:grid-cols-2 gap-2 md:gap-3 lg:gap-5 my-5">
      {adminDistroStats.map((stat, i) => (
        <StatsCard key={i} stat={stat} />
      ))}
    </div>
  );
}
