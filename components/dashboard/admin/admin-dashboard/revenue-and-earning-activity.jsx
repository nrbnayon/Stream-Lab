import EarningActivity from "./earning-activity";
import MonthlyRevenue from "./monthly-revenue";

export default function RevenueAndEarningActivity() {
  return (
    <div className="my-5 grid grid-cols-1 lg:grid-cols-4 gap-3 md:gap-5">
      <MonthlyRevenue />
      <EarningActivity />
    </div>
  );
}
