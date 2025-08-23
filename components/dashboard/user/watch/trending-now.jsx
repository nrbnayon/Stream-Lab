import MovieCard from "@/components/movie-card";
import { moviesData } from "@/constants";

export default function TrendingNow() {
  return (
    <div className="my-5" id="trending-movie">
      <h2 className="text-2xl md:text-4xl font-medium leading-relaxed">
        Trending Now
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {moviesData.slice(0, 8).map((movie) => (
          <MovieCard movie={movie} key={movie.id} useLink={true} />
        ))}
      </div>
    </div>
  );
}
