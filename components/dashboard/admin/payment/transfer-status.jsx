// components/dashboard/admin/payment/transfer-status.jsx
"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetAdminPaymentsQuery } from "@/redux/store/api/adminApi";

export default function TransferStatus() {
  const { data: paymentsResponse, isLoading } = useGetAdminPaymentsQuery();
  const transferStatus = paymentsResponse?.transfer_status || {};

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transfer Status</CardTitle>
          <CardDescription>
            Status breakdown of recent transactions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-muted animate-pulse rounded h-8"></div>
          ))}
        </CardContent>
      </Card>
    );
  }

  const statusData = [
    {
      label: "Completed",
      count: transferStatus.completed_count || 0,
      color: "bg-green-500",
    },
    {
      label: "Pending",
      count: transferStatus.pending_count || 0,
      color: "bg-yellow-500",
    },
    {
      label: "Failed",
      count: transferStatus.failed_count || 0,
      color: "bg-primary",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transfer Status</CardTitle>
        <CardDescription>
          Status breakdown of recent transactions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {statusData.map((status) => (
          <div key={status.label} className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div
                className={`w-4 aspect-square ${status.color} rounded-full`}
              />
              <span className="md:text-lg font-medium">{status.label}</span>
            </div>
            <p className="text-secondary-foreground">
              {status.count} transaction{status.count !== 1 ? "s" : ""}
            </p>
          </div>
        ))}

        {Object.keys(transferStatus).length === 0 && (
          <div className="text-center text-secondary-foreground py-4">
            No transfer status data available
          </div>
        )}
      </CardContent>
    </Card>
  );
}
