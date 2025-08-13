"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { minutesToHours, truncateText, webShare } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlayIcon,
  Share01Icon,
  Time04Icon,
} from "@hugeicons/core-free-icons/index";
import { Button } from "./ui/button";

export default function MovieCard({ movie }) {
  const handleShare = async () => {
    await webShare({
      title: movie.title,
      // TODO: change the url
      url: `${window.location.href}`,
    });
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="relative">
          <Image
            src={movie.thumbnail_url}
            alt={movie.title}
            width={200}
            height={80}
            className="w-full rounded-md h-44 object-cover"
          />
          <Button
            variant="destructive"
            size="sm"
            className="absolute bottom-2 left-2 rounded-full"
          >
            <HugeiconsIcon icon={PlayIcon} size={25} />
            Trailer
          </Button>
        </div>
        <CardTitle className="text-xl">{movie.title}</CardTitle>

        {/* Badge and Duration */}
        <div className="flex gap-5">
          <Badge variant="secondary">Movie</Badge>
          <span className="text-secondary-foreground text-sm flex gap-2 items-center">
            <HugeiconsIcon icon={Time04Icon} size={18} />
            {minutesToHours(movie.duration)}
          </span>
        </div>

        {/* movie description */}
        <CardDescription className="text-base">
          {truncateText(movie.logline)}
        </CardDescription>
      </CardHeader>

      {/* Content | prices */}
      <CardContent className="text-muted-foreground">
        <p className="flex justify-between">
          <span>Rent</span>
          <span>$9.45</span>
        </p>
        <p className="flex justify-between">
          <span>Buy</span>
          <span>$12.99</span>
        </p>
      </CardContent>

      {/* Footer | button & share */}
      <CardFooter className="flex gap-3 justify-between">
        <Button className="grow">Rent</Button>
        <Button className="grow" variant="outline">
          Buy
        </Button>

        <Button size="icon" variant="ghost" onClick={handleShare}>
          <HugeiconsIcon icon={Share01Icon} />
        </Button>
      </CardFooter>
    </Card>
  );
}
