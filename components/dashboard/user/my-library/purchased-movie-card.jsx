"use client";
import Image from "next/image";
import { useState } from "react";
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

  // State to handle image error
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(
    thumbnail || "/placeholder-movie.jpg"
  );

  console.log("status::", status);

  // Calculate progress percentage
  const progressPercentage = watch_progress || 0;

  // Format purchase/rental date
  const getAccessDate = () => {
    if ((access_type === "Rent" || access_type === "Rented") && expiry_time) {
      const expiryDate = new Date(expiry_time);
      const isExpired = expiryDate <= new Date();
      if (isExpired) {
        return `Expired on ${expiryDate.toLocaleDateString()}`;
      }
      // return `Expires on ${expiryDate.toLocaleDateString()}`;
    }
    // For purchased items, show generic purchased message or use creation date if available
    return access_type === "Purchase" || access_type === "Purchased"
      ? "Purchased"
      : "Rented";
  };

  // Determine if user should continue or start watching
  const watchButtonText = progressPercentage > 0 ? "Continue" : "Watch";
  const watchTime = current_watch_time || 0;

  // Handle image error
  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      setImageSrc("/placeholder-movie.jpg");
    }
  };

  return (
    <Card className="w-full md:gap-2">
      <CardHeader className="md:gap-0">
        <div className="relative">
          <Image
            src={imageSrc}
            alt={title || "Movie"}
            width={200}
            height={80}
            className="w-full rounded-md h-44 object-cover"
            onError={handleImageError}
            unoptimized={imageError}
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
          <Badge variant="secondary" className="absolute top-2 left-2">
            {access_type === "Purchase" || access_type === "Purchased"
              ? "Purchased"
              : "Rented"}
          </Badge>

          {/* Status indicator for inactive/expired content */}
          {status?.toLowerCase() !== "active" && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              {status?.toLowerCase() === "expired" ? "Expired" : "Inactive"}
            </Badge>
          )}
        </div>

        {/* Movie name and share icon */}
        <CardTitle className="text-xl flex justify-between items-center">
          {title || "Movie Name"}
          {/* Share icon */}
          <WebShare
            className="text-primary"
            url={`${
              typeof window !== "undefined" ? window.location.origin : ""
            }/film/${film_id}`}
            title={title}
          />
        </CardTitle>

        {/* Badge and Duration */}
        <div className="flex gap-5 mt-1">
          <Badge variant="secondary">{film_type || "Movie"}</Badge>
          <span className="text-secondary-foreground text-sm flex gap-2 items-center">
            <HugeiconsIcon icon={Time04Icon} className="size-4" />
            {minutesToHours(full_film_duration || 0)}
          </span>
        </div>
      </CardHeader>

      {/* Purchase/rental info */}
      <CardContent className="text-muted-foreground">
        <p>{getAccessDate()}</p>
        {(access_type === "Rent" || access_type === "Rented") &&
          expiry_time && (
            <p className="text-xs mt-1">
              {new Date(expiry_time) > new Date()
                ? `Valid until ${new Date(expiry_time).toLocaleDateString()}`
                : "Rental expired"}
            </p>
          )}
      </CardContent>

      {/* Footer | progress */}
      <CardFooter className="block p-0">
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
