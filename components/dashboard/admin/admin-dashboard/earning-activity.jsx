// EarningActivity.jsx
"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, DollarSign, Users, ShoppingCart } from "lucide-react";

export default function EarningActivity({ dashboardResponse, isLoading }) {
  console.log("dashboardResponse EarningActivity::", dashboardResponse);

  // Get the actual values
  const totalBuy =
    dashboardResponse?.last_month_earning_activity?.total_buy || 0;
  const totalRent =
    dashboardResponse?.last_month_earning_activity?.total_rent || 0;
  const totalSubscriber =
    dashboardResponse?.last_month_earning_activity?.total_subscriber_earning ||
    0;

  // Check if all values are zero
  const hasData = totalBuy > 0 || totalRent > 0 || totalSubscriber > 0;

  // Transform API data to chart format
  const data = [
    {
      name: "Total Buy",
      value: totalBuy,
      fill: "#26408B",
    },
    {
      name: "Total Rent",
      value: totalRent,
      fill: "#00A1FF",
    },
    {
      name: "Total Subscriber",
      value: totalSubscriber,
      fill: "#A855F7",
    },
  ];

  // Placeholder data for empty state visualization (optional)
  const placeholderData = [
    { name: "Total Buy", value: 1, fill: "#E5E7EB" },
    { name: "Total Rent", value: 1, fill: "#D1D5DB" },
    { name: "Total Subscriber", value: 1, fill: "#9CA3AF" },
  ];

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Earning Activity</CardTitle>
          <CardDescription>Last month Earning activity</CardDescription>
        </CardHeader>
        <CardContent className="h-80 w-full">
          <div className="flex items-center justify-center h-full">
            <div className="animate-pulse">Loading...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Earning Activity</CardTitle>
        <CardDescription>Last month Earning activity</CardDescription>
      </CardHeader>
      <CardContent className="h-80 w-full">
        {!hasData ? (
          // Empty State Design
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="mb-4 p-3 bg-gray-100 rounded-full">
              <TrendingUp className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Activity Yet
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Earning activity will appear here once you have transactions
            </p>
            <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full mb-2 mx-auto">
                  <ShoppingCart className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-xs text-gray-500">Buy</p>
                <p className="text-sm font-medium">$0</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 bg-cyan-100 rounded-full mb-2 mx-auto">
                  <DollarSign className="h-5 w-5 text-cyan-600" />
                </div>
                <p className="text-xs text-gray-500">Rent</p>
                <p className="text-sm font-medium">$0</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full mb-2 mx-auto">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <p className="text-xs text-gray-500">Subscribers</p>
                <p className="text-sm font-medium">$0</p>
              </div>
            </div>
          </div>
        ) : (
          // Chart with actual data
          <ChartContainer
            config={{
              value: {
                label: "Earnings",
              },
            }}
            className="h-full w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  dataKey="value"
                  nameKey="name"
                  isAnimationActive={true}
                >
                  {data.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
