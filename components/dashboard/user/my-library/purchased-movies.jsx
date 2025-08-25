"use client";
import PurchasedMovieCard from "./purchased-movie-card";
import SearchWithOptions from "../../search-with-options";
import { useEffect, useState } from "react";

export default function PurchasedMovies() {
  const [filter, setFilter] = useState({ searchValue: "", selectedOption: "" });

  // TODO: Fetch and control data from here
  useEffect(() => {
    console.log(filter);
  }, [filter]);

  return (
    <div className="my-5">
      <h2 className="text-2xl md:text-3xl font-medium">Purchased Movies</h2>
      <SearchWithOptions
        options={["All", "Purchased", "Rented"]}
        onChange={(data) => setFilter(data)}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <PurchasedMovieCard key={index} movie={[]} />
        ))}
      </div>
    </div>
  );
}
