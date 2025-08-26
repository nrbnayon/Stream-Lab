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
import { transactions } from "@/constants";
import {
  ArrowDownLeft01Icon,
  ArrowUpRight01Icon,
  ReloadIcon,
} from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";

export default function RecentTransactionsTable() {
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
            {transactions.map((transaction, i) => (
              <TableRow key={i}>
                <TableCell className="flex gap-2 justify-center">
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
                  {transaction.type}
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
                  {transaction.status === "Failed" ? "" : "+"}
                  {transaction.amount}
                </TableCell>
                <TableCell>{transaction.payment_method}</TableCell>
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
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
