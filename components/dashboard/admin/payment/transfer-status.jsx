import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TransferStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transfer status </CardTitle>
        <CardDescription>
          Status breakdown of recent transactions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* Completed */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div className="w-4 aspect-square bg-green-500 rounded-full" />
            <span className="md:text-lg font-medium">Completed</span>
          </div>
          <p className="text-secondary-foreground">245 transactions</p>
        </div>
        {/* Pending */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div className="w-4 aspect-square bg-yellow-500 rounded-full" />
            <span className="md:text-lg font-medium">Pending</span>
          </div>
          <p className="text-secondary-foreground">51 transactions</p>
        </div>
        {/* Failed */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div className="w-4 aspect-square bg-destructive rounded-full" />
            <span className="md:text-lg font-medium">Failed</span>
          </div>
          <p className="text-secondary-foreground">245 transactions</p>
        </div>
      </CardContent>
    </Card>
  );
}
