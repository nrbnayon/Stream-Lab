// components\dashboard\user\watch\trending-now.jsx
"use client";
import { useGetTrendingFilmsQuery } from "@/redux/store/api/filmsApi";
import { moviesData } from "@/constants";
import MovieCard from "@/components/movie-card";

export default function TrendingNow() {
  const {
    data: trendingResponse,
    isLoading,
    error,
  } = useGetTrendingFilmsQuery();

  const trendingFilms = trendingResponse?.data || [];

  if (isLoading) {
    return (
      <div className="my-5 md:my-10" id="trending-movie">
        <h2 className="text-2xl md:text-4xl font-medium leading-relaxed">
          Trending Now
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-secondary animate-pulse rounded-md h-80"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    console.error("Error fetching trending films:", error);
  }

  const filmsToShow =
    trendingFilms.length > 0 ? trendingFilms : moviesData.slice(0, 8);

  return (
    <div className="my-5 md:my-10" id="trending-movie">
      <h2 className="text-2xl md:text-4xl font-medium leading-relaxed">
        Trending Now
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
        {filmsToShow.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={{
              ...movie,
              thumbnail_url: movie.thumbnail || movie.thumbnail_url,
              duration: movie.duration || 120,
              type: movie?.film_type || movie?.type,
              trailer_url: movie.trailer_hls_url || movie.trailer_url,
            }}
          />
        ))}
      </div>
    </div>
  );
}
