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
import { chartData } from "@/constants";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";

const chartConfig = {
  last_year: {
    label: "Last Year",
  },
  current: {
    label: "This Year",
  },
};

export default function MonthlyRevenue() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Monthly Revenue</CardTitle>
        <CardDescription>Earning over last month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80 w-full">
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
            <Legend verticalAlign="bottom" wrapperStyle={{ bottom: -10 }} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
