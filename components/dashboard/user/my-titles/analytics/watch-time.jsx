// components\dashboard\user\my-titles\analytics\watch-time.jsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function WatchTime() {
  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle>Daily Views (Last 7 Days)</CardTitle>
        <CardDescription>Average watch time</CardDescription>
      </CardHeader>
      <CardContent className="text-4xl font-bold text-primary">
        1h 45m
      </CardContent>
    </Card>
  );
}
