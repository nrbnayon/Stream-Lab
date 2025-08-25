import { adminPaymentsStats } from "@/constants";
import StatsCard from "../stats-card";

export default function AdminPaymentsStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 lg:gap-5 my-5">
      {adminPaymentsStats.map((stat, i) => (
        <StatsCard key={i} stat={stat} />
      ))}
    </div>
  );
}
