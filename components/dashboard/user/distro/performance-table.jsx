// components\dashboard\user\distro\performance-table.jsx
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
import { useGetDistroBalanceQuery } from "@/redux/store/api/distroApi";

export default function PerformanceTable() {
  const { data: distroResponse, isLoading, error } = useGetDistroBalanceQuery();
  const performanceData = distroResponse?.per_film || [];

  // console.log(distroResponse);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "failed":
        return "destructive";
      default:
        return "secondary";
    }
  };

  if (isLoading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Film</TableHead>
            <TableHead>Shared Date</TableHead>
            <TableHead>Clicks</TableHead>
            <TableHead>Earning</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 3 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="h-4 bg-muted rounded animate-pulse"></div>
              </TableCell>
              <TableCell>
                <div className="h-4 bg-muted rounded animate-pulse"></div>
              </TableCell>
              <TableCell>
                <div className="h-4 bg-muted rounded animate-pulse"></div>
              </TableCell>
              <TableCell>
                <div className="h-4 bg-muted rounded animate-pulse"></div>
              </TableCell>
              <TableCell>
                <div className="h-4 bg-muted rounded animate-pulse"></div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5">
        <p className="text-destructive">
          Failed to load performance data. Please try again later.
        </p>
      </div>
    );
  }

  if (performanceData.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">
          No performance data available yet. Start sharing films to see your
          results here.
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Film</TableHead>
          <TableHead>Shared Date</TableHead>
          <TableHead>Clicks</TableHead>
          <TableHead>Earning</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {performanceData.map((film) => (
          <TableRow key={film.film_id}>
            <TableCell className="font-medium">{film.film_title}</TableCell>
            <TableCell>
              {film.first_click_date
                ? formatDate(film.first_click_date)
                : "N/A"}
            </TableCell>
            <TableCell>{film.film_clicks || 0}</TableCell>
            <TableCell className="text-green-500">
              ${parseFloat(film.film_earning || 0).toFixed(2)}
            </TableCell>
            <TableCell>
              <Badge variant={getStatusVariant(film.status)}>
                {film.status || "Unknown"}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
