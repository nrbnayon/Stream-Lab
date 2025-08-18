import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TransactionHistory() {
  return (
    <div className="my-8 bg-secondary py-10 px-5 rounded-md">
      <h3 className="text-2xl font-medium">Transaction History</h3>
      <p className="text-secondary-foreground">
        View your transaction history here
      </p>

      {/* rendering Table */}
      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            <TableHead>Source</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Paypal</TableCell>
            <TableCell className="text-green-500">+200.00</TableCell>
            <TableCell>25 January 2025</TableCell>
            <TableCell>
              <Badge variant="success">Completed</Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Card</TableCell>
            <TableCell className="text-destructive">145.14</TableCell>
            <TableCell>17 June 2025</TableCell>
            <TableCell>
              <Badge variant="destructive">Failed</Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Distro</TableCell>
            <TableCell className="text-green-500">+94.20</TableCell>
            <TableCell>11 March 2025</TableCell>
            <TableCell>
              <Badge variant="success">Completed</Badge>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
