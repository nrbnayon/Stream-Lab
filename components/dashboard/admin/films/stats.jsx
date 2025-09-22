"use client";
import CircularLoader from "@/components/ui/CircularLoader";
import StatsCard from "../stats-card";
import { useGetAdminFilmsQuery } from "@/redux/store/api/adminApi";

export default function AdminFilmsStats() {
  const { data: filmsResponse, isLoading } = useGetAdminFilmsQuery();
  const stats = filmsResponse?.stats || {};

  // Convert API stats to match your existing stats card format
  const adminFilmsStats = [
    {
      heading: "Total Films",
      value: stats.total_films || 0,
      isGreen: true,
    },
    {
      heading: "Total Buy Revenue",
      value: `$${stats.total_buy || 0}`,
      isGreen: true,
    },
    {
      heading: "Total Rent Revenue",
      value: `$${stats.total_rent || 0}`,
      isGreen: true,
    },
  ];

  if (isLoading) {
    return (
      <div className="">
        <CircularLoader
          size={60}
          thickness={5}
          gap={4}
          message=""
          outerColor="border-primary"
          innerColor="border-red-500"
          textColor="text-blue-600"
          className="py-12"
          showMessage={false}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 lg:gap-5 my-5">
      {adminFilmsStats.map((stat, i) => (
        <StatsCard key={i} stat={stat} />
      ))}
    </div>
  );
}
