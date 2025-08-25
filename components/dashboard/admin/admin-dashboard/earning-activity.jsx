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
import { PieChart, Pie, Cell, Legend } from "recharts";

const data = [
  { name: "Total Buy", value: 400, fill: "#26408B" },
  { name: "Total Rent", value: 300, fill: "#00A1FF" },
  { name: "Total Subscriber", value: 300, fill: "#FFFFFF" },
];

export default function EarningActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Earning Activity</CardTitle>
        <CardDescription>Last month Earning activity</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            value: {
              label: "Earnings",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-80 w-full"
        >
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
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
