"use client";
import { useGetLatestFilmsQuery } from "@/redux/store/api/filmsApi";
import { moviesData } from "@/constants";
import MovieCard from "@/components/movie-card";

export default function LatestDrama() {
  const { data: latestResponse, isLoading, error } = useGetLatestFilmsQuery();
  const latestFilms = latestResponse?.data || [];

  if (isLoading) {
    return (
      <div className="container my-10 md:my-16" id="latest-drama">
        <h2 className="text-2xl md:text-4xl font-medium leading-relaxed">
          Latest Drama
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
    console.error("Error fetching latest films:", error);
  }

  const filmsToShow =
    latestFilms.length > 0 ? latestFilms : moviesData.slice(0, 8);

  return (
    <div className="container my-10 md:my-16" id="latest-drama">
      <h2 className="text-2xl md:text-4xl font-medium leading-relaxed">
        Latest Drama
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
