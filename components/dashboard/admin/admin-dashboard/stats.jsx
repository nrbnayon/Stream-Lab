import StatsCard from "../stats-card";
import { adminDashboardStats } from "@/constants";

export default function AdminDashboardStats({}) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-5 my-5">
      {adminDashboardStats.map((stat, i) => (
        <StatsCard key={i} stat={stat} />
      ))}
    </div>
  );
}
