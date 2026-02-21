"use client";
import Image from "next/image";
import {
  Card,
  CardFooter,
  CardHeader,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { cn, secondsToMinutes } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlayIcon, Time04Icon } from "@hugeicons/core-free-icons/index";
import { Button } from "./ui/button";
import TrailerPopup from "./trailer-popup";
import PaymentDialog from "./dashboard/payment-dialog";
import Link from "next/link";
import DistroPopup from "./DistroPopup";
import { useGetMeQuery } from "@/redux/store/api/usersApi";
import { useState } from "react";

export default function MovieCard({
  movie,
  useLink = false,
  isUserLogin = true,
}) {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  // Map API data structure to component props
  const {
    id,
    title,
    thumbnail_url,
    thumbnail,
    full_film_duration,
    duration,
    logline,
    buy_price,
    rent_price,
    film_type,
    type,
    trailer_hls_url,
    trailer_url,
  } = movie;

  const { data: userData, isLoading: userLoading } = useGetMeQuery();
  const referralCode = userData?.data?.referral_code || "user123";

  // Use the correct field names based on API structure
  const thumbnailSrc = thumbnail_url || thumbnail;
  // full_film_duration comes in seconds, duration in minutes
  const movieDuration = full_film_duration || duration;
  const isDurationInSeconds = !!full_film_duration;
  const movieType = type || film_type;
  // Capitalize first letter of movie type
  const capitalizedMovieType = movieType
    ? movieType.charAt(0).toUpperCase() + movieType.slice(1).toLowerCase()
    : "";
  const trailerUrl = trailer_url || trailer_hls_url;

  const handleTrailerHover = () => {
    const timeout = setTimeout(() => {
      setIsTrailerOpen(true);
    }, 500); // Netflix-like delay
    setHoverTimeout(timeout);
  };

  const handleTrailerLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  const handleTrailerClick = () => {
    setIsTrailerOpen(true);
  };

  const handleTrailerClose = () => {
    setIsTrailerOpen(false);
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full overflow-hidden rounded-md">
          {useLink ? (
            <Link href={`/film/${id}`}>
              <Image
                src={thumbnailSrc}
                alt={title}
                width={800}
                height={450}
                quality={100}
                className="w-full h-full object-cover"
                priority={true}
              />
            </Link>
          ) : (
            <Image
              src={thumbnailSrc}
              alt={title}
              width={800}
              height={450}
              className="w-full h-full object-cover"
            />
          )}
          {/* Trailer button with hover/click functionality */}
          {trailerUrl && (
            <Button
              variant="destructive"
              size="sm"
              className="rounded-full absolute bottom-2 left-2"
              onMouseEnter={handleTrailerHover}
              onMouseLeave={handleTrailerLeave}
              onClick={handleTrailerClick}
            >
              <HugeiconsIcon icon={PlayIcon} />
              Trailer
            </Button>
          )}
        </div>
        <h1 className="text-xl">
          {useLink ? <Link href={`/film/${id}`}>{title}</Link> : title}
        </h1>

              {/* Badge, Duration, and Prices in one line */}
        <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground py-1">
          <Badge variant="secondary" className="font-medium">
            {capitalizedMovieType}
          </Badge>
          {movieDuration && (
            <>
              <span className="text-secondary-foreground text-sm flex gap-2 items-center">
              <HugeiconsIcon icon={Time04Icon} size={18} />
                {isDurationInSeconds
                  ? secondsToMinutes(movieDuration)
                  : formatDuration(movieDuration)}
              </span>
              <span>•</span>
            </>
          )}
          {rent_price && buy_price && (
            <span className="font-semibold mr-6">
              ${rent_price} / ${buy_price}
            </span>
          )}
      </ div>
      </CardHeader>

      {/* Footer | button & share */}
      <CardFooter className={cn("flex gap-2", {
        "-mt-3": rent_price && buy_price
      })}>
        <div className="grid grid-cols-2 w-full gap-2">
          {rent_price && (
            <PaymentDialog
              dialogTitle={`Rent  –  ${title}`}
              inputValue={rent_price}
              triggerBtn={
                <Button className="w-full" variant="outline" asChild>
                  <span>Rent</span>
                </Button>
              }
              intention="rent"
              intentionBtnText="Pay"
              filmId={id}
              filmTitle={title}
              maxRentPrice={rent_price}
            />
          )}
          {buy_price && (
            <PaymentDialog
              dialogTitle={`Buy – ${title}`}
              inputValue={buy_price}
              triggerBtn={
                <Button className="w-full" asChild>
                  <span>Buy</span>
                </Button>
              }
              intention="buy"
              intentionBtnText="Pay"
              filmId={id}
              filmTitle={title}
            />
          )}
        </div>

        <div className="flex gap-1">
          {/* <WebShare title={title} url={`${process.env.NEXT_PUBLIC_LIVE_URL}/film/${id}?referral=${referralCode}`} /> */}
          <DistroPopup
            movieId={id}
            movieTitle={title}
            movie_pic={thumbnailSrc}
            distributionUrl={`${process.env.NEXT_PUBLIC_LIVE_URL}/watch/${id}?referral=${referralCode}`}
            isUserLogin={isUserLogin}
          />
        </div>
      </CardFooter>

      {/* Netflix-style Trailer Popup */}
      {trailerUrl && (
        <TrailerPopup
          movie={{
            trailer_url: trailerUrl,
            title: title,
            logline: logline, // description
          }}
          isOpen={isTrailerOpen}
          onClose={handleTrailerClose}
          netflixMode={true}
        />
      )}
    </Card>
  );
}
