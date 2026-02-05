// components\dashboard\user\distro\quick-share.jsx
"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import QuickShareCard from "./quick-share-card";
import { useGetDistroBalanceQuery } from "@/redux/store/api/distroApi";

// Function to decode and format thumbnail URL
function formatThumbnailUrl(encodedUrl) {
  if (!encodedUrl) return "";
  // The URL comes as: /media/https%3A/project-titles-prod.s3.us-west-1.amazonaws.com/...
  // We need to extract and decode it
  const decodedUrl = decodeURIComponent(encodedUrl);
  // Remove /media/ prefix if it exists
  return decodedUrl.replace(/^\/media\//, "");
}

export default function QuickShare() {
  const { data: distroResponse, isLoading, error } = useGetDistroBalanceQuery();
  const randomFilms = (distroResponse?.random_popular_films || []).map(
    (film) => ({
      ...film,
      thumbnail: formatThumbnailUrl(film.thumbnail),
    }),
  );

  if (isLoading) {
    return (
      <Card className="my-5">
        <CardHeader>
          <CardTitle>Distro Hub</CardTitle>
          <CardDescription>Loading popular films...</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-muted animate-pulse rounded-md h-24"
            ></div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="my-5">
        <CardHeader>
          <CardTitle>Distro Hub</CardTitle>
          <CardDescription>Failed to load films</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-5">
            <p className="text-destructive">
              Unable to load popular films. Please try again later.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle>Distro Hub</CardTitle>
        <CardDescription>
          Generate Distro links to earn 70% per purchase
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5">
        {randomFilms.length > 0 ? (
          randomFilms.map((film) => (
            <QuickShareCard key={film.film_id} film={film} />
          ))
        ) : (
          <div className="col-span-full text-center py-5">
            <p className="text-muted-foreground">
              No films available for sharing
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
