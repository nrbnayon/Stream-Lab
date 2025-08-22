import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PerformanceTable from "./performance-table";

export default function YourPerformance() {
  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle>Your Performance</CardTitle>
        <CardDescription>Track your Distro sharing results</CardDescription>
      </CardHeader>
      <CardContent className="">
        <PerformanceTable />
      </CardContent>
    </Card>
  );
}
