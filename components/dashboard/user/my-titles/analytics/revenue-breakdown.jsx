// components/dashboard/user/my-titles/analytics/revenue-breakdown.jsx
"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetMyTitlesAnalyticsQuery } from "@/redux/store/api/filmsApi";

export default function RevenueBreakdown({ filmId }) {
  const { data: analyticsData, isLoading } =
    useGetMyTitlesAnalyticsQuery(filmId);

  const rentalEarning = analyticsData?.total_rent_earning || 0;
  const purchaseEarning = analyticsData?.total_buy_earning || 0;
  const totalEarning = rentalEarning + purchaseEarning;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Breakdown</CardTitle>
        <CardDescription>Your total revenue so far</CardDescription>
      </CardHeader>
      <CardContent className="space-y-1 md:space-y-2 text-lg">
        {isLoading ? (
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="w-16 h-6 bg-muted animate-pulse rounded"></div>
              <div className="w-20 h-6 bg-muted animate-pulse rounded"></div>
            </div>
            <div className="flex justify-between">
              <div className="w-20 h-6 bg-muted animate-pulse rounded"></div>
              <div className="w-20 h-6 bg-muted animate-pulse rounded"></div>
            </div>
            <Separator className="bg-gray-500" />
            <div className="flex justify-between">
              <div className="w-12 h-6 bg-muted animate-pulse rounded"></div>
              <div className="w-20 h-6 bg-muted animate-pulse rounded"></div>
            </div>
          </div>
        ) : (
          <>
            <p className="flex justify-between">
              <span>Rental</span>
              <span className="text-green-500">
                ${rentalEarning.toFixed(2)}
              </span>
            </p>
            <p className="flex justify-between">
              <span>Purchases</span>
              <span className="text-green-500">
                ${purchaseEarning.toFixed(2)}
              </span>
            </p>
            <Separator className="bg-gray-500" />
            <p className="flex justify-between">
              <span>Total</span>
              <span className="text-green-500">${totalEarning.toFixed(2)}</span>
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
