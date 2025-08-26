"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { minutesToHours } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlayIcon, Time04Icon } from "@hugeicons/core-free-icons/index";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import WebShare from "@/components/web-share";

export default function PurchasedMovieCard({ movie }) {
  const {} = movie;
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="relative">
          <Image
            src={
              "https://i.pinimg.com/1200x/b4/e2/59/b4e259133c021a727a797d07bc89086b.jpg"
            }
            alt={"Change title"}
            width={200}
            height={80}
            className="w-full rounded-md h-44 object-cover"
          />
          {/* TODO: Redirect to Watch movie page */}
          {/* Continue watch button */}
          {/* TODO: Update film link */}
          <Link href="/film/film_id">
            <Button
              variant="destructive"
              size="sm"
              className="rounded-full absolute bottom-2 left-2"
              asChild
            >
              <span>
                <HugeiconsIcon icon={PlayIcon} size={25} />
                Continue
              </span>
            </Button>
          </Link>
          {/* Purchase badge */}
          <Badge variant="secondary" className="absolute top-2 left-2">
            Purchased
          </Badge>
        </div>
        {/* Movie name and share icon */}
        <CardTitle className="text-xl flex justify-between items-center">
          {"Movie Name"}
          {/* Share icon */}
          <WebShare className="text-primary" />
        </CardTitle>

        {/* Badge and Duration */}
        <div className="flex gap-5">
          <Badge variant="secondary">{"Movie"}</Badge>
          <span className="text-secondary-foreground text-sm flex gap-2 items-center">
            <HugeiconsIcon icon={Time04Icon} className="size-4" />
            {minutesToHours(214)}
          </span>
        </div>
      </CardHeader>

      {/* purchase || view history */}
      <CardContent className="text-muted-foreground">
        <p>Purchased at 12-12-2023</p>
      </CardContent>

      {/* Footer | progress */}
      <CardFooter className="block">
        <Label className="flex justify-between text-secondary-foreground mb-0.5">
          <span>Progress</span>
          <span>75%</span>
        </Label>
        <Progress value={75} />
      </CardFooter>
    </Card>
  );
}
