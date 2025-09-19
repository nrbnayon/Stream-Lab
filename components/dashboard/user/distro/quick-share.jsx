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

export default function QuickShare() {
  const { data: distroResponse, isLoading, error } = useGetDistroBalanceQuery();
  const randomFilms = distroResponse?.random_popular_films || [];

  if (isLoading) {
    return (
      <Card className="my-5">
        <CardHeader>
          <CardTitle>Quick Share</CardTitle>
          <CardDescription>Loading popular films...</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5">
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
          <CardTitle>Quick Share</CardTitle>
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
        <CardTitle>Quick Share</CardTitle>
        <CardDescription>
          Generate Distro links for popular films
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5">
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
