// components/dashboard/admin/distro/top-earning-distro.jsx
"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetAdminDistroReportQuery } from "@/redux/store/api/adminApi";

export default function TopEarningDistro() {
  const { data: distroResponse, isLoading } = useGetAdminDistroReportQuery();
  const topUsers = distroResponse?.top_3_monthly_users || [];

  if (isLoading) {
    return (
      <Card className="my-5">
        <CardHeader>
          <CardTitle>Top Earning Distro</CardTitle>
          <CardDescription>Highest earning Distro this month</CardDescription>
        </CardHeader>
        <CardContent className="grid lg:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-3 lg:gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-muted animate-pulse rounded-md h-16"
            ></div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle>Top Earning Distro</CardTitle>
        <CardDescription>Highest earning Distro this month</CardDescription>
      </CardHeader>
      <CardContent className="grid lg:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-3 lg:gap-5">
        {topUsers.length > 0 ? (
          topUsers.map((user, index) => (
            <div
              key={user.user_id}
              className="flex justify-between items-center px-5 py-3 border border-white/25 rounded-md"
            >
              <p className="flex gap-3 items-center">
                <span className="w-7 md:w-10 aspect-square bg-secondary-foreground text-card text-lg md:text-2xl grid place-items-center rounded-full font-bold">
                  {index + 1}
                </span>
                <span className="text-lg md:text-xl font-medium">
                  {user.full_name}
                </span>
              </p>
              <div className="text-right">
                <p className="text-base md:text-lg font-medium text-secondary-foreground">
                  ${Number(user.monthly_earning).toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {user.monthly_clicks} clicks
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-secondary-foreground py-8">
            No top earners data available
          </div>
        )}
      </CardContent>
    </Card>
  );
}
