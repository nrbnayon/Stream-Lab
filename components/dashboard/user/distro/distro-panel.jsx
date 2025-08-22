import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Unlink04Icon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import DistroCode from "./distro-code";

export default function DistroPanel() {
  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HugeiconsIcon icon={Unlink04Icon} />
          Distro Panel
        </CardTitle>
        <CardDescription>Use the code generate Distro links</CardDescription>
      </CardHeader>
      <CardContent>
        <DistroCode />
      </CardContent>
    </Card>
  );
}
