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
import { distroTransactions } from "@/constants";
export default function DistroTransactions() {
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
              <TableHead>User</TableHead>
              <TableHead>Total Earnings</TableHead>
              <TableHead>Total clicks</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {distroTransactions.map((transaction, i) => (
              <TableRow key={i}>
                <TableCell>{transaction.user}</TableCell>
                <TableCell
                  className={
                    transaction.status === "failed"
                      ? "text-destructive"
                      : transaction.status === "pending"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }
                >
                  {transaction.status === "failed" ? "" : "+"}$
                  {transaction.total_earning}
                </TableCell>
                <TableCell>{transaction.total_clicks}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      transaction.status === "failed"
                        ? "destructive"
                        : transaction.status === "pending"
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
