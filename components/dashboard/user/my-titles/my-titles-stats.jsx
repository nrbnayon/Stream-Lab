// components/dashboard/user/my-titles/my-titles-stats.jsx
"use client";
import { useGetMyTitlesQuery } from "@/redux/store/api/filmsApi";

export default function MyTitlesStats() {
  const { data: titlesResponse, isLoading } = useGetMyTitlesQuery({});

  const stats = titlesResponse?.results?.stats || {
    total_films: 0,
    published_films: 0,
    total_views: 0,
    total_earning: 0,
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-5 my-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-secondary py-10 rounded-md px-2 space-y-1 animate-pulse"
          >
            <div className="h-6 bg-muted rounded"></div>
            <div className="h-10 bg-muted rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-5 my-5">
      <div className="bg-secondary text-center py-10 rounded-md px-2 space-y-1">
        <h4 className="text-xl md:text-2xl font-medium text-secondary-foreground">
          Total Films
        </h4>
        <h2 className="text-3xl md:text-4xl font-black">{stats.total_films}</h2>
      </div>
      <div className="bg-secondary text-center py-10 rounded-md px-2 space-y-1">
        <h4 className="text-xl md:text-2xl font-medium text-secondary-foreground">
          Published
        </h4>
        <h2 className="text-3xl md:text-4xl font-black">
          {stats.published_films}
        </h2>
      </div>
      <div className="bg-secondary text-center py-10 rounded-md px-2 space-y-1">
        <h4 className="text-xl md:text-2xl font-medium text-secondary-foreground">
          Total Views
        </h4>
        <h2 className="text-3xl md:text-4xl font-black">{stats.total_views}</h2>
      </div>
      <div className="bg-secondary text-center py-10 rounded-md px-2 space-y-1">
        <h4 className="text-xl md:text-2xl font-medium text-secondary-foreground">
          Total Earning
        </h4>
        <h2 className="text-3xl md:text-4xl font-black text-green-500">
          ${stats.total_earning?.toFixed(2)}
        </h2>
      </div>
    </div>
  );
}
