import { moviesData } from "@/constants";
import MovieCard from "../movie-card";

export default function TrendingNow() {
  return (
    <div className="container my-10 md:my-16" id="trending-movie">
      <h2 className="text-2xl md:text-4xl font-medium leading-relaxed">
        Trending Now
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
        {moviesData.slice(0, 8).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
