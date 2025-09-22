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
import { minutesToHours, truncateText } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlayIcon, Time04Icon } from "@hugeicons/core-free-icons/index";
import { Button } from "./ui/button";
import TrailerPopup from "./trailer-popup";
import PaymentDialog from "./dashboard/payment-dialog";
import Link from "next/link";
import WebShare from "./web-share";
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
  const movieDuration = duration || full_film_duration;
  const movieType = type || film_type;
  const trailerUrl = trailer_url || trailer_hls_url;

  const handleTrailerHover = () => {
    const timeout = setTimeout(() => {
      setIsTrailerOpen(true);
    }, 800); // Netflix-like delay
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
      <CardHeader>
        <div className="relative">
          {useLink ? (
            <Link href={`/film/${id}`}>
              <Image
                src={thumbnailSrc}
                alt={title}
                width={800}
                height={400}
                quality={100}
                className="w-full rounded-md h-44 object-cover"
                priority={true}
              />
            </Link>
          ) : (
            <Image
              src={thumbnailSrc}
              alt={title}
              width={200}
              height={80}
              className="w-full rounded-md h-44 object-cover"
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
        <CardTitle className="text-xl">
          {useLink ? <Link href={`/film/${id}`}>{title}</Link> : title}
        </CardTitle>

        {/* Badge and Duration */}
        <div className="flex gap-5">
          <Badge variant="secondary">{movieType}</Badge>
          {movieDuration && (
            <span className="text-secondary-foreground text-sm flex gap-2 items-center">
              <HugeiconsIcon icon={Time04Icon} size={18} />
              {minutesToHours(movieDuration)}
            </span>
          )}
        </div>

        {/* movie description */}
        {logline && (
          <CardDescription className="text-base">
            {truncateText(logline)}
          </CardDescription>
        )}
      </CardHeader>

      {/* Content | prices */}
      <CardContent className="text-muted-foreground">
        {rent_price && (
          <p className="flex justify-between">
            <span>Rent</span>
            <span>${rent_price}</span>
          </p>
        )}
        {buy_price && (
          <p className="flex justify-between">
            <span>Buy</span>
            <span>${buy_price}</span>
          </p>
        )}
      </CardContent>

      {/* Footer | button & share */}
      <CardFooter className="flex gap-2">
        <div className="grid grid-cols-2 w-full gap-2">
          {rent_price && (
            <PaymentDialog
              dialogTitle={`Rent  –  ${title}`}
              inputValue={rent_price}
              triggerBtn={
                <Button className="w-full" asChild>
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
                <Button className="w-full" variant="outline" asChild>
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
          }}
          isOpen={isTrailerOpen}
          onClose={handleTrailerClose}
          netflixMode={true}
        />
      )}
    </Card>
  );
}
