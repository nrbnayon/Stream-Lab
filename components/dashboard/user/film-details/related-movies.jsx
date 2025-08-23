import MovieCard from "@/components/movie-card";
import { moviesData } from "@/constants";

export default function RelatedMovies() {
  return (
    <section className="my-5">
      <h3 className="text-2xl mb-3">Related Movies</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {moviesData.slice(0, 4).map((movie) => (
          <MovieCard movie={movie} key={movie.id} useLink={true} />
        ))}
      </div>
    </section>
  );
}
