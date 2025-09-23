// components/dashboard/admin/distro/distro-transactions.jsx
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
import { useGetAdminDistroReportQuery } from "@/redux/store/api/adminApi";
import Pagination from "../films/Pagination";

export default function DistroTransactions() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: distroResponse, isLoading } = useGetAdminDistroReportQuery({
    page: currentPage,
  });

  const transactions = distroResponse?.user_wise || [];
  const itemsPerPage = 10;
  const totalItems = transactions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Client-side pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTransactions = transactions.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Distro Transactions</CardTitle>
          <CardDescription>
            Review the all payment activities, including status, method, and
            amount using distro.
          </CardDescription>
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
        <CardTitle>Distro Transactions</CardTitle>
        <CardDescription>
          Review the all payment activities, including status, method, and
          amount using distro.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Total Earnings</TableHead>
              <TableHead>Total Clicks</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((transaction) => (
                <TableRow key={transaction.user_id}>
                  <TableCell className="font-medium">
                    {transaction.full_name}
                  </TableCell>
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
                    {Number(transaction.total_earning).toFixed(2)}
                  </TableCell>
                  <TableCell>{transaction.total_clicks}</TableCell>
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
                <TableCell colSpan={4} className="text-center">
                  No distro transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
