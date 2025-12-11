// components/dashboard/admin/payment/withdrawals-table.jsx
"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAdminWithdrawalsQuery } from "@/redux/store/api/adminApi";
import Pagination from "../films/Pagination";
import WithdrawalActionDialog from "./withdrawal-action-dialog";

export default function WithdrawalsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    withdrawal: null,
    action: null,
  });

  const { data: withdrawalsResponse, isLoading } = useGetAdminWithdrawalsQuery({
    page: currentPage,
    page_size: 10,
  });

  const withdrawals = withdrawalsResponse?.pending_withdrawals || [];
  const pagination = withdrawalsResponse?.pagination || {};

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const openDialog = (withdrawal, action) => {
    setDialogState({
      isOpen: true,
      withdrawal,
      action,
    });
  };

  const closeDialog = () => {
    setDialogState({
      isOpen: false,
      withdrawal: null,
      action: null,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Withdrawal Requests</CardTitle>
          <CardDescription>Loading withdrawal requests...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="bg-muted animate-pulse rounded h-12"
              ></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Withdrawal Requests</CardTitle>
          <CardDescription>
            Review and manage user withdrawal requests. Approve or reject pending requests.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>User Email</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Prev. Balance</TableHead>
                <TableHead>Withdrawal Amount</TableHead>
                <TableHead>Curr. Balance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Requested At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {withdrawals.length > 0 ? (
                withdrawals.map((withdrawal) => (
                  <TableRow key={withdrawal.id}>
                    <TableCell className="font-medium">
                      #{withdrawal.id}
                    </TableCell>
                    <TableCell>{withdrawal.user_email}</TableCell>
                    <TableCell className="font-mono text-sm">
                      {withdrawal.user_id}
                    </TableCell>
                    <TableCell>
                      ${Number(withdrawal.previous_balance).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-green-500 font-medium">
                      ${Number(withdrawal.withdraw_amount).toFixed(2)}
                    </TableCell>
                    <TableCell
                      className={
                        withdrawal.current_balance < 0
                          ? "text-destructive font-medium"
                          : ""
                      }
                    >
                      ${Number(withdrawal.current_balance).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          withdrawal.status === "pending"
                            ? "warning"
                            : withdrawal.status === "approved"
                            ? "success"
                            : "destructive"
                        }
                      >
                        {withdrawal.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {formatDate(withdrawal.requested_at)}
                    </TableCell>
                    <TableCell className="flex items-center justify-center gap-2">
                      {withdrawal.status === "pending" ? (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => openDialog(withdrawal, "approved")}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => openDialog(withdrawal, "rejected")}
                          >
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">
                          No action
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    No withdrawal requests found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {pagination.total_pages > 1 && (
            <div className="mt-4">
              <Pagination
                currentPage={pagination.current_page || currentPage}
                totalPages={pagination.total_pages}
                totalItems={pagination.total_records}
                onPageChange={handlePageChange}
                itemsPerPage={pagination.page_size || 10}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Dialog */}
      <WithdrawalActionDialog
        isOpen={dialogState.isOpen}
        onClose={closeDialog}
        withdrawal={dialogState.withdrawal}
        action={dialogState.action}
      />
    </>
  );
}
