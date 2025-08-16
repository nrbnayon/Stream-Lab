import PurchasedMovieCard from "./purchased-movie-card";
import SearchWithOptions from "../../search-with-options";

export default function PurchasedMovies({ movies = [] }) {
  return (
    <div className="mt-10">
      <SearchWithOptions options={["All", "Purchased", "Rented"]} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <PurchasedMovieCard key={index} movie={[]} />
        ))}
      </div>
    </div>
  );
}
