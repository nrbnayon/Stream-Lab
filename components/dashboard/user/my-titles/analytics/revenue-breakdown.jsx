// components\dashboard\user\my-titles\analytics\revenue-breakdown.jsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
export default function RevenueBreakdown() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Breakdown</CardTitle>
        <CardDescription>Your total revenue so far</CardDescription>
      </CardHeader>
      <CardContent className="space-y-1 md:space-y-2 text-lg">
        <p className="flex justify-between">
          <span>Rental</span>
          <span className="text-green-500">$280.50</span>
        </p>
        <p className="flex justify-between">
          <span>Purchases</span>
          <span className="text-green-500">$170.50</span>
        </p>
        <Separator className="bg-gray-500" />
        <p className="flex justify-between">
          <span>Total</span>
          <span className="text-green-500">$451.00</span>
        </p>
      </CardContent>
    </Card>
  );
}
