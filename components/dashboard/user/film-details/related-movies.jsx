import MovieCard from "@/components/movie-card";

export default function RelatedMovies({ movies, currentFilmId }) {
  // Filter out current film if it exists in related movies
  const filteredMovies = movies.filter((movie) => movie.id !== currentFilmId);

  if (!filteredMovies || filteredMovies.length === 0) {
    return (
      <section className="my-5">
        <h3 className="text-2xl mb-3">Related Movies</h3>
        <p className="text-muted-foreground">No related movies found.</p>
      </section>
    );
  }

  return (
    <section className="my-5">
      <h3 className="text-2xl mb-3">Related Movies</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredMovies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} useLink={true} />
        ))}
      </div>
    </section>
  );
}
