// MonthlyRevenue.jsx
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
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const chartConfig = {
  last_year: {
    label: "Last Year",
  },
  current: {
    label: "This Year",
  },
};

export default function MonthlyRevenue({ dashboardResponse, isLoading }) {
  // Transform API data to chart format
  const chartData =
    dashboardResponse?.monthly_revenue?.labels?.map((month, index) => ({
      month,
      last_year: dashboardResponse?.monthly_revenue?.last_year?.[index] || 0,
      current: dashboardResponse?.monthly_revenue?.current_year?.[index] || 0,
    })) || [];

  if (isLoading) {
    return (
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Monthly Revenue</CardTitle>
          <CardDescription>Earning over last month</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto h-80">
          <div className="flex items-center justify-center h-full">
            <div>Loading...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle>Monthly Revenue</CardTitle>
        <CardDescription>Earning over last month</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto h-80">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tickFormatter={(value) =>
                  value >= 1000
                    ? `$${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`
                    : `$${value}`
                }
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="last_year"
                fill="var(--chart-1)"
                radius={200}
                name="Last Year"
              />
              <Bar
                dataKey="current"
                fill="var(--chart-2)"
                radius={200}
                name="Current"
              />
              <Legend verticalAlign="bottom" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
