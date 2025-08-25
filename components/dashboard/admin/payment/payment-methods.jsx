import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

export default function PaymentMethods() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>Breakdown by payment methods</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* Stripe */}
        <div>
          <Label className="flex justify-between mb-0.5">
            <span>Stripe</span>
            <span>65%</span>
          </Label>
          <div className="grow flex justify-between gap-3 items-center">
            <p className="text-secondary-foreground">156 transactions</p>
            <Progress color="green" value={65} className="max-w-md" />
          </div>
        </div>
        {/* Paypal */}
        <div>
          <Label className="flex justify-between mb-0.5">
            <span>PayPal</span>
            <span>25%</span>
          </Label>
          <div className="grow flex justify-between gap-3 items-center">
            <p className="text-secondary-foreground">45 transactions</p>
            <Progress color="green" value={25} className="max-w-md" />
          </div>
        </div>
        {/* ReelBux */}
        <div>
          <Label className="flex justify-between mb-0.5">
            <span>ReelBux</span>
            <span>12%</span>
          </Label>
          <div className="grow flex justify-between gap-3 items-center">
            <p className="text-secondary-foreground">18 transactions</p>
            <Progress color="green" value={12} className="max-w-md" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
