import { moviesData } from "@/constants";
import MovieCard from "../movie-card";

export default function LatestDrama() {
  return (
    <div className="container mt-16">
      <h2 className="text-4xl font-medium leading-relaxed">Latest Drama</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {moviesData.slice(0, 8).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
