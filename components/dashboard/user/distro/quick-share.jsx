import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import QuickShareCard from "./quick-share-card";

export default function QuickShare() {
  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle>Quick Share</CardTitle>
        <CardDescription>
          Generate Distro links for popular films
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <QuickShareCard key={i} />
        ))}
      </CardContent>
    </Card>
  );
}
