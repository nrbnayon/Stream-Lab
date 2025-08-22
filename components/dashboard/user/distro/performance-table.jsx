import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PerformanceTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Flim</TableHead>
          <TableHead>Shared Date</TableHead>
          <TableHead>Clicks</TableHead>
          <TableHead>Earning</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 8 }).map((_, i) => (
          <TableRow key={i}>
            <TableCell>Midnight Dreams</TableCell>
            <TableCell>25 February 2025</TableCell>
            <TableCell>25</TableCell>
            <TableCell className="text-green-500">$25.25</TableCell>
            <TableCell>
              <Badge variant="success">Completed</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
