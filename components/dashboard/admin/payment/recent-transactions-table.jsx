// components/dashboard/admin/payment/recent-transactions-table.jsx
"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
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
import { useGetAdminPaymentsQuery } from "@/redux/store/api/adminApi";
import {
  ArrowDownLeft01Icon,
  ArrowUpRight01Icon,
  ReloadIcon,
} from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import Pagination from "../films/Pagination";

export default function RecentTransactionsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: paymentsResponse, isLoading } = useGetAdminPaymentsQuery({
    page: currentPage,
  });

  const transactions = paymentsResponse?.transactions_list || [];
  const pagination = paymentsResponse?.pagination || {};

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Loading transactions...</CardDescription>
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
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>
          Review the latest payment activities, including status, method, and
          amount.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Pay. Method</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((transaction, i) => (
                <TableRow key={i}>
                  <TableCell className="flex gap-2 items-center">
                    <HugeiconsIcon
                      icon={
                        transaction.status === "Failed"
                          ? ArrowDownLeft01Icon
                          : transaction.status === "Pending"
                          ? ReloadIcon
                          : ArrowUpRight01Icon
                      }
                      className={
                        transaction.status === "Failed"
                          ? "text-destructive"
                          : transaction.status === "Pending"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }
                    />
                    <span className="capitalize">{transaction.tx_type}</span>
                  </TableCell>
                  <TableCell>{transaction.user}</TableCell>
                  <TableCell
                    className={
                      transaction.status === "Failed"
                        ? "text-destructive"
                        : transaction.status === "Pending"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }
                  >
                    {transaction.status === "Failed" ? "-" : "+"}$
                    {Number(transaction.amount).toFixed(2)}
                  </TableCell>
                  <TableCell className="capitalize">
                    {transaction.payment_method}
                  </TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        transaction.status === "Failed"
                          ? "destructive"
                          : transaction.status === "Pending"
                          ? "warning"
                          : "success"
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No transactions found
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
              totalItems={pagination.count}
              onPageChange={handlePageChange}
              itemsPerPage={12}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
