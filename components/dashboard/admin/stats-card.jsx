import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";

export default function StatsCard({ stat }) {
  const {
    heading = "",
    value = "",
    icon,
    isDollar = false,
    isGreen = false,
  } = stat;
  return (
    <Card>
      <CardHeader>
        <CardDescription className="text-xl md:text-2xl flex justify-between items-center">
          <span>{heading}</span>
          <HugeiconsIcon icon={icon} className="size-6 md:size-7" />
        </CardDescription>
        <CardTitle
          className={`mt-4 text-3xl md:text-4xl ${
            isGreen ? "text-green-500" : ""
          }`}
        >
          {isDollar && "$"}
          {value}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
