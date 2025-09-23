// components/dashboard/admin/subscribers/render-subscribers-table.jsx
"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import SubscriberDeleteAlert from "./subscriber-delete-alert";

export default function RenderSubscribersTable({
  subscribers = [],
  isLoading,
  error,
}) {
  if (error) {
    return (
      <div className="text-center py-8 text-destructive">
        Error loading subscribers: {error.message}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-3 mt-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-muted animate-pulse rounded h-12"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscribers.length > 0 ? (
            subscribers.map((subscriber) => (
              <TableRow key={subscriber.subscriber_id}>
                <TableCell className="font-medium">
                  {subscriber.full_name}
                </TableCell>
                <TableCell>{subscriber.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      subscriber.plan_name === "Pro" ? "default" : "secondary"
                    }
                  >
                    {subscriber.plan_name}
                  </Badge>
                </TableCell>
                <TableCell>{subscriber.current_period_start}</TableCell>
                <TableCell>
                  <SubscriberDeleteAlert subscriber={subscriber} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                No subscribers found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
