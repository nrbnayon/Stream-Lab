import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function WeeklyEarnings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Earnings (Last 7 Weeks)</CardTitle>
        <CardDescription>Revenue trends over time</CardDescription>
      </CardHeader>
      <CardContent>
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="flex justify-between items-center gap-5 text-secondary-foreground mb-0.5"
          >
            <p className="grow">Week {i + 1}</p>
            <div className="grow flex items-center gap-3">
              <Progress
                value={25 * (i + 1)}
                className="max-w-md"
                color="green"
              />
              <p className="w-10 text-right">${25 * (i + 1)}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
