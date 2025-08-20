import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function DailyViews({}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Views (Last 7 Days)</CardTitle>
        <CardDescription>View trends over the past week</CardDescription>
      </CardHeader>
      <CardContent>
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="flex justify-between items-center gap-5 text-secondary-foreground mb-0.5"
          >
            <p className="grow">Day {i + 1}</p>
            <div className="grow flex items-center gap-3">
              <Progress value={25 * (i + 1)} className="max-w-md" />
              <p className="w-10 text-right">{25 * (i + 1)}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
