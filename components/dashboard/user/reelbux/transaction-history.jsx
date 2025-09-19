"use client";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useGetReelBuxBalanceQuery } from "@/redux/store/api/reelbuxApi";
import { useState } from "react";

export default function TransactionHistory() {
  const { data: reelBuxResponse, isLoading } = useGetReelBuxBalanceQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const transactions = reelBuxResponse?.txn_data || [];

  // Calculate pagination
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getStatusVariant = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "success";
      case "failed":
        return "destructive";
      case "pending":
        return "default";
      default:
        return "default";
    }
  };

  const getAmountColor = (txType) => {
    // Transactions that increase the balance (positive/green)
    const creditTransactions = ["add fund", "refund"];

    const isCredit = creditTransactions.some((creditType) =>
      txType.toLowerCase().includes(creditType)
    );

    return isCredit ? "text-green-500" : "text-destructive";
  };

  const formatAmount = (amount, txType) => {
    const creditTransactions = ["add fund", "refund"];

    const isCredit = creditTransactions.some((creditType) =>
      txType.toLowerCase().includes(creditType)
    );

    const prefix = isCredit ? "+" : "-";
    return `${prefix}$${amount.toFixed(2)}`;
  };

  if (isLoading) {
    return (
      <div className="my-5 bg-secondary py-5 md:py-10 px-5 rounded-md">
        <div className="h-8 bg-muted rounded mb-2 animate-pulse"></div>
        <div className="h-4 bg-muted rounded mb-5 w-1/2 animate-pulse"></div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-muted rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="my-5 bg-secondary py-5 md:py-10 px-5 rounded-md">
      <h3 className="text-2xl font-medium">Transaction History</h3>
      <p className="text-secondary-foreground">
        View your transaction history here
      </p>

      {/* rendering Table */}
      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            <TableHead>Source</TableHead>
            <TableHead>Transaction Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentTransactions.length > 0 ? (
            currentTransactions.map((transaction, index) => (
              <TableRow key={startIndex + index}>
                <TableCell>{transaction.source}</TableCell>
                <TableCell>{transaction.tx_type}</TableCell>
                <TableCell className={getAmountColor(transaction.tx_type)}>
                  {formatAmount(transaction.amount, transaction.tx_type)}
                </TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(transaction.status)}>
                    {transaction.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                No transactions found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {transactions.length > itemsPerPage && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-secondary-foreground">
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, transactions.length)} of {transactions.length}{" "}
            transactions
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm px-3">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
