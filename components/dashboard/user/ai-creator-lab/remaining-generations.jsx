import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ZapIcon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";

export default function RemainingGenerations() {
  const generationLimit = 3;
  const consumedGenerations = 3;
  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle className="flex gap-1 items-center">
          <HugeiconsIcon icon={ZapIcon} />
          Free Image, Script Analysis & Video Quota
        </CardTitle>
        <CardDescription>
          {generationLimit - consumedGenerations} of {generationLimit} free
          generations remaining this month
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <Progress
          value={(100 / generationLimit) * consumedGenerations}
          color={consumedGenerations === generationLimit ? "red" : "primary"}
        />
      </CardContent>
    </Card>
  );
}
