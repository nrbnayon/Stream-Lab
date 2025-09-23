// components/dashboard/admin/payment/payment-methods.jsx
"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useGetAdminPaymentsQuery } from "@/redux/store/api/adminApi";

export default function PaymentMethods() {
  const { data: paymentsResponse, isLoading } = useGetAdminPaymentsQuery();
  const paymentMethods = paymentsResponse?.payment_method || {};

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Breakdown by payment methods</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-muted animate-pulse rounded h-16"></div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>Breakdown by payment methods</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {Object.entries(paymentMethods).map(([method, data]) => (
          <div key={method}>
            <Label className="flex justify-between mb-0.5">
              <span className="capitalize">{method}</span>
              <span>{data.percentage?.toFixed(1)}%</span>
            </Label>
            <div className="flex justify-between gap-3 items-center">
              <p className="text-secondary-foreground shrink-0">
                {data.total} transactions
              </p>
              <Progress
                color="green"
                value={data.percentage || 0}
                className="w-2/3 lg:max-w-md"
              />
            </div>
          </div>
        ))}

        {Object.keys(paymentMethods).length === 0 && (
          <div className="text-center text-secondary-foreground py-4">
            No payment method data available
          </div>
        )}
      </CardContent>
    </Card>
  );
}
