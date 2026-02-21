// app\(roles)\(user)\film\[id]\page.jsx
"use client";
import RelatedMovies from "@/components/dashboard/user/film-details/related-movies";
import TrailerPopup from "@/components/trailer-popup";
import PaymentDialog from "@/components/dashboard/payment-dialog";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/video-player/video-player";
import {
  useGetMyLibraryDetailsQuery,
  useIncrementViewCountMutation,
  useUpdateWatchTimeMutation,
} from "@/redux/store/api/filmsApi";
import { useParams, useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import {  formatDuration } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import DistroPopup from "@/components/DistroPopup";

export default function FilmDetails() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const startTime = searchParams.get("time") || 0;

  // Tracking states
  const [hasIncrementedView, setHasIncrementedView] = useState(false);
  const [hasTriggeredViewCount, setHasTriggeredViewCount] = useState(false);
  const watchTimeTimeout = useRef(null);

  // First try to get from user's library
  const {
    data: libraryResponse,
    isLoading: libraryLoading,
    error: libraryError,
  } = useGetMyLibraryDetailsQuery(id);

  // Mutations for tracking
  const [incrementViewCount] = useIncrementViewCountMutation();
  const [updateWatchTime] = useUpdateWatchTimeMutation();

  // Determine which data to use
  const isLoading = libraryLoading;
  const error = libraryError;
  const filmResponse = libraryResponse;
  const filmData = filmResponse?.film_details;
  const relatedMovies = filmResponse?.related_movies || [];

  // Determine if user has access (only true if from library API)
  const hasLibraryAccess = !!libraryResponse;
  const hasFullAccess =
    hasLibraryAccess &&
    (filmData?.access_type === "Owned" ||
      filmData?.access_type === "Rented" ||
      filmData?.access_type === "Purchase" ||
      filmData?.access_type === "Purchased" ||
      filmData?.access_type === "Filmmaker");

  // Check if rental is expired
  const isRentalExpired =
    hasLibraryAccess &&
    (filmData?.access_type === "Rented" || filmData?.access_type === "Rent") &&
    filmData?.expiry_time &&
    new Date(filmData.expiry_time) < new Date();

  // Final access check (not expired)
  const canWatchFullFilm = hasFullAccess && !isRentalExpired;

  // console.log("Library response:", libraryResponse);
  // console.log("Can watch full film:", canWatchFullFilm);
  // console.log("Has library access:", hasLibraryAccess);
  // console.log("Is rental expired:", isRentalExpired);

  // Increment view count - only once per session when user has full access
  useEffect(() => {
    if (
      canWatchFullFilm &&
      !hasIncrementedView &&
      !hasTriggeredViewCount &&
      filmData?.id
    ) {
      // console.log("Incrementing view count for film:", filmData.id);
      setHasTriggeredViewCount(true);

      incrementViewCount(filmData.id)
        .unwrap()
        .then((response) => {
          // console.log("View count incremented successfully:", response);
          setHasIncrementedView(true);
        })
        .catch((error) => {
          console.error("Failed to increment view count:", error);
          setHasTriggeredViewCount(false); // Allow retry on error
        });
    }
  }, [
    canWatchFullFilm,
    hasIncrementedView,
    hasTriggeredViewCount,
    filmData?.id,
    incrementViewCount,
  ]);

  // Handle watch time tracking with better debouncing and validation
  const handleTimeUpdate = useCallback(
    (currentTime) => {
      if (!canWatchFullFilm || !filmData?.id || currentTime <= 5) {
        return; // Only track if more than 5 seconds
      }

      const watchTimeMinutes = Math.floor(currentTime / 60);

      // Don't update if time hasn't progressed meaningfully (at least 1 minute)
      if (watchTimeMinutes === 0) {
        return;
      }

      // Clear any existing timeout
      if (watchTimeTimeout.current) {
        clearTimeout(watchTimeTimeout.current);
      }

      // Debounce the API call - wait 5 seconds after last update (increased from 2)
      watchTimeTimeout.current = setTimeout(() => {
        // console.log(
        //   "Updating watch time:",
        //   watchTimeMinutes,
        //   "minutes for film:",
        //   filmData.id
        // );

        updateWatchTime({
          filmId: filmData.id,
          watchTime: watchTimeMinutes,
        })
          .unwrap()
          .then((response) => {
            // console.log("Watch time updated successfully:", response);
          })
          .catch((error) => {
            console.error("Failed to update watch time:", error);
          });
      }, 5000); // Increased debounce time
    },
    [canWatchFullFilm, filmData?.id, updateWatchTime],
  );

  // Handle immediate watch time update (on pause, seek, or component unmount)
  const handleImmediateTimeUpdate = useCallback(
    (currentTime) => {
      if (!canWatchFullFilm || !filmData?.id || currentTime <= 0) {
        return;
      }

      const watchTimeMinutes = Math.floor(currentTime / 60);

      // Clear any pending timeout
      if (watchTimeTimeout.current) {
        clearTimeout(watchTimeTimeout.current);
        watchTimeTimeout.current = null;
      }

      // Update immediately
      if (watchTimeMinutes > 0) {
        // console.log(
        //   "Immediate watch time update:",
        //   watchTimeMinutes,
        //   "minutes for film:",
        //   filmData.id
        // );

        updateWatchTime({
          filmId: filmData.id,
          watchTime: watchTimeMinutes,
        })
          .unwrap()
          .then((response) => {
            // console.log("Immediate watch time updated successfully:", response);
          })
          .catch((error) => {
            console.error("Failed to update immediate watch time:", error);
          });
      }
    },
    [canWatchFullFilm, filmData?.id, updateWatchTime],
  );

  // Clean up timeout on component unmount
  useEffect(() => {
    return () => {
      if (watchTimeTimeout.current) {
        clearTimeout(watchTimeTimeout.current);
      }
    };
  }, []);

  if (isLoading) {
    return (
      <div className="grid gap-5">
        {/* Video Player Skeleton */}
        <Skeleton className="h-[400px] w-full rounded-md" />

        {/* Details section Skeleton */}
        <section className="my-5 space-y-5">
          <Skeleton className="h-10 w-1/2" />

          {/* Details Skeleton */}
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex gap-12">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-40" />
              </div>
            ))}
          </div>

          {/* Buttons Skeleton */}
          <div className="space-x-2 flex items-center">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-10" />
          </div>
        </section>

        {/* Related Videos Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-64 w-full rounded-md" />
          ))}
        </div>
      </div>
    );
  }

  if (error && error?.status !== 404) {
    const getErrorMessage = () => {
      if (error?.status === 401) {
        return "You need to be logged in to view this film";
      }
      if (error?.status === 403) {
        return "You don't have access to this film";
      }
      if (error?.status === 500) {
        return "Server error occurred. Please try again later";
      }
      if (error?.data?.message) {
        return error.data.message;
      }
      if (error?.message) {
        return error.message;
      }
      return "Unable to load film details. Please try again later";
    };

    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          Error Loading Film
        </h2>
        <p className="text-muted-foreground mb-4">{getErrorMessage()}</p>
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          className="mt-4"
        >
          Try Again
        </Button>
        {/* Debug info in development */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-6 p-4 bg-gray-100 rounded text-left max-w-md mx-auto">
            <h4 className="font-semibold mb-2">Error Details:</h4>
            <p className="text-sm text-red-600">
              Status: {error?.status || "Unknown"}
            </p>
            <p className="text-sm text-red-600">
              {JSON.stringify(error, null, 2)}
            </p>
          </div>
        )}
      </div>
    );
  }

  if (!filmData) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Film Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The requested film could not be found.
        </p>
        <Button onClick={() => window.history.back()} variant="outline">
          Go Back
        </Button>
      </div>
    );
  }

  const {
    title,
    logline,
    film_type,
    genre,
    year,
    full_film_duration,
    trailer_hls_url,
    film_hls_url,
    thumbnail,
    id: film_id,
    buy_price,
    rent_price,
    access_type,
    status,
    expiry_time,
    watch_progress,
    current_watch_time,
  } = filmData;

  // Use full film URL if user can watch full film, otherwise trailer
  // Important: Check if film_hls_url is different from trailer_hls_url
  const videoSrc =
    canWatchFullFilm && film_hls_url && film_hls_url !== trailer_hls_url
      ? film_hls_url
      : trailer_hls_url;

  // Show payment buttons only if user doesn't have library access and prices are available
  const showPaymentButtons = !hasLibraryAccess && (buy_price || rent_price);

  return (
    <div className="grid gap-5">
      {/* Video Player */}
      {videoSrc && (
        <VideoPlayer
          src={videoSrc}
          poster={thumbnail}
          title={title}
          startTime={parseInt(startTime)}
          filmId={film_id}
          onTimeUpdate={handleTimeUpdate}
          onClose={handleImmediateTimeUpdate}
          isFullFilm={canWatchFullFilm}
        />
      )}

      {/* Details section */}
      <section className="my-5 space-y-5">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-4xl font-medium">{title}</h2>

            {/* Rent/Buy buttons right after title if user doesn't have library access */}
            {showPaymentButtons && (
              <div className="flex gap-3 mt-4">
                {rent_price && (
                  <PaymentDialog
                    dialogTitle={`Rent – ${title}`}
                    inputValue={rent_price}
                    triggerBtn={
                      <Button className="px-6" asChild>
                        <span>Rent ${rent_price}</span>
                      </Button>
                    }
                    intention="rent"
                    intentionBtnText="Rent Now"
                  />
                )}
                {buy_price && (
                  <PaymentDialog
                    dialogTitle={`Buy – ${title}`}
                    inputValue={buy_price}
                    triggerBtn={
                      <Button variant="outline" className="px-6" asChild>
                        <span>Buy ${buy_price}</span>
                      </Button>
                    }
                    intention="buy"
                    intentionBtnText="Buy Now"
                  />
                )}
              </div>
            )}
          </div>

          {/* Access status badge - only show if user has library access */}
          {hasLibraryAccess && access_type && (
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  access_type === "Owned" ||
                  access_type === "Purchase" ||
                  access_type === "Purchased"
                    ? "bg-green-100 text-green-800"
                    : access_type === "Filmmaker"
                      ? "bg-purple-100 text-purple-800"
                      : access_type === "Rented" || access_type === "Rent"
                        ? isRentalExpired
                          ? "bg-primary/70 text-red-800"
                          : "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                }`}
              >
                {access_type === "Purchase" || access_type === "Purchased"
                  ? "Purchased"
                  : access_type}
                {isRentalExpired ? " (Expired)" : ""}
              </span>
              {(access_type === "Rented" || access_type === "Rent") &&
                expiry_time && (
                  <span className="text-sm text-muted-foreground">
                    Expires: {new Date(expiry_time).toLocaleDateString()}
                  </span>
                )}
            </div>
          )}
        </div>

        {/* Show rental expired message */}
        {isRentalExpired && (
          <div className="bg-primary/50 border border-red-200 rounded-md p-3">
            <p className="text-sm text-red-800">
              <strong>Rental Expired:</strong> This rental has expired. You'll
              need to rent again to watch the full film.
            </p>
          </div>
        )}

        {/* Show trailer only message if user doesn't have full access */}
        {!canWatchFullFilm && trailer_hls_url && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
            <p className="text-sm text-yellow-800">
              {/* <strong>Trailer Preview:</strong> You're currently watching the
              trailer. */}
              {showPaymentButtons && " Rent or buy to watch the full film."}
              {isRentalExpired &&
                " Your rental has expired - rent again to watch the full film."}
            </p>
          </div>
        )}

        {/* Show full film access message if user has access */}
        {canWatchFullFilm && (
          <div className="bg-green-50 border border-green-200 rounded-md p-3">
            <p className="text-sm text-green-800">
              <strong>Full Film Access:</strong> You have access to watch the
              complete film.
              {(access_type === "Rented" || access_type === "Rent") &&
                expiry_time &&
                ` Valid until ${new Date(expiry_time).toLocaleDateString()}.`}
            </p>
          </div>
        )}

        {/* Watch Progress - only show if user has full access and not expired */}
        {canWatchFullFilm &&
          watch_progress !== undefined &&
          watch_progress > 0 && (
            <div className="bg-muted p-3 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Watch Progress</span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(watch_progress)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${watch_progress}%` }}
                ></div>
              </div>
              {current_watch_time && (
                <p className="text-sm text-muted-foreground mt-1">
                  Watched: {formatDuration(current_watch_time)} of{" "}
                  {formatDuration(full_film_duration)}
                </p>
              )}
            </div>
          )}

        {/* Details */}
        <div className="table text-lg text-muted-foreground">
          {year && (
            <div className="table-row">
              <div className="table-cell font-medium pr-12">Year:</div>
              <div className="table-cell">{year}</div>
            </div>
          )}
          {genre && (
            <div className="table-row">
              <div className="table-cell font-medium pr-12">Genre:</div>
              <div className="table-cell">
                {Array.isArray(genre) ? genre.join(", ") : genre}
              </div>
            </div>
          )}
          <div className="table-row">
            <div className="table-cell font-medium pr-12">Type:</div>
            <div className="table-cell">{film_type}</div>
          </div>
          {full_film_duration && (
            <div className="table-row">
              <div className="table-cell font-medium pr-12">Duration:</div>
              <div className="table-cell">
                {formatDuration(full_film_duration)}
              </div>
            </div>
          )}
          {(buy_price || rent_price) && (
            <div className="table-row">
              <div className="table-cell font-medium pr-12">Price:</div>
              <div className="table-cell">
                {buy_price && `Buy: $${buy_price}`}
                {buy_price && rent_price && " | "}
                {rent_price && `Rent: $${rent_price}`}
              </div>
            </div>
          )}
          {hasLibraryAccess && status && (
            <div className="table-row">
              <div className="table-cell font-medium pr-12">Status:</div>
              <div className="table-cell capitalize">{status}</div>
            </div>
          )}
          {logline && (
            <div className="table-row">
              <div className="table-cell font-medium pr-12 align-top">
                Description:
              </div>
              <div className="table-cell">{logline}</div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="space-x-2 flex items-center">
          {trailer_hls_url && (
            <TrailerPopup
              movie={{
                trailer_url: trailer_hls_url,
                title: title,
              }}
              triggerBtn={
                <Button className="px-8" asChild>
                  <span>Trailer</span>
                </Button>
              }
            />
          )}
          <DistroPopup
            movieId={film_id}
            movieTitle={title}
            movie_pic={thumbnail}
            distributionUrl={`${
              typeof window !== "undefined" ? window.location.origin : ""
            }/film/${film_id}`}
            isUserLogin={true}
          />
        </div>
      </section>

      {/* Related Videos - Pass the API data */}
      <RelatedMovies movies={relatedMovies} currentFilmId={film_id} />
    </div>
  );
}
