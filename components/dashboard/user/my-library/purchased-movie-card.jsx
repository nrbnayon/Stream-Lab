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
  const {
    film_id,
    title,
    film_type,
    full_film_duration,
    access_type,
    status,
    expiry_time,
    thumbnail,
    watch_progress,
    current_watch_time,
  } = movie;

  // Calculate progress percentage
  const progressPercentage = watch_progress || 0;

  // Format expiry or purchase date
  const getAccessDate = () => {
    if (access_type === "Rent" && expiry_time) {
      const expiryDate = new Date(expiry_time);
      return `Expires: ${expiryDate.toLocaleDateString()}`;
    }
    // For purchased items, you might want to show purchase date if available
    return access_type === "Purchase" ? "Purchased" : "Rented";
  };

  // Determine if user should continue or start watching
  const watchButtonText = progressPercentage > 0 ? "Continue" : "Watch";
  const watchTime = current_watch_time || 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="relative">
          <Image
            src={thumbnail || "/placeholder-movie.jpg"}
            alt={title}
            width={200}
            height={80}
            className="w-full rounded-md h-44 object-cover"
            onError={(e) => {
              e.currentTarget.src = "/placeholder-movie.jpg";
            }}
          />

          {/* Continue/Watch button */}
          <Link
            href={`/film/${film_id}${
              watchTime > 0 ? `?time=${watchTime}` : ""
            }`}
          >
            <Button
              variant="destructive"
              size="sm"
              className="rounded-full absolute bottom-2 left-2"
              asChild
            >
              <span>
                <HugeiconsIcon icon={PlayIcon} size={25} />
                {watchButtonText}
              </span>
            </Button>
          </Link>

          {/* Access type badge */}
          <Badge
            variant={access_type === "Purchase" ? "secondary" : "outline"}
            className="absolute top-2 left-2"
          >
            {access_type === "Purchase" ? "Purchased" : "Rented"}
          </Badge>

          {/* Status indicator for inactive/expired content */}
          {status !== "active" && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              {status === "expired" ? "Expired" : "Inactive"}
            </Badge>
          )}
        </div>

        {/* Movie name and share icon */}
        <CardTitle className="text-xl flex items-center gap-2 min-w-0">
          <span className="truncate flex-1 min-w-0">{title}</span>
          <WebShare
            className="text-primary flex-shrink-0"
            url={`${
              typeof window !== "undefined" ? window.location.origin : ""
            }/film/${film_id}`}
            title={title}
          />
        </CardTitle>

        {/* Badge and Duration */}
        <div className="flex gap-5">
          <Badge variant="secondary">{film_type}</Badge>
          <span className="text-secondary-foreground text-sm flex gap-2 items-center">
            <HugeiconsIcon icon={Time04Icon} className="size-4" />
            {minutesToHours(full_film_duration)}
          </span>
        </div>
      </CardHeader>

      {/* Access info */}
      <CardContent className="text-muted-foreground">
        <p>{getAccessDate()}</p>
        {access_type === "Rent" && expiry_time && (
          <p className="text-sm mt-1">
            {new Date(expiry_time) > new Date()
              ? `Valid until ${new Date(expiry_time).toLocaleDateString()}`
              : "Expired"}
          </p>
        )}
      </CardContent>

      {/* Footer | progress */}
      <CardFooter className="block">
        <Label className="flex justify-between text-secondary-foreground mb-0.5">
          <span>Progress</span>
          <span>{Math.round(progressPercentage)}%</span>
        </Label>
        <Progress value={progressPercentage} />
        {current_watch_time > 0 && (
          <p className="text-xs text-muted-foreground mt-1">
            Watched {minutesToHours(current_watch_time)} of{" "}
            {minutesToHours(full_film_duration)}
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
