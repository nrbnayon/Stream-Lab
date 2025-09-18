"use client";
import PurchasedMovieCard from "./purchased-movie-card";
import SearchWithOptions from "../../search-with-options";
import { useGetMyLibraryQuery } from "@/redux/store/api/filmsApi";
import { useEffect, useState } from "react";

export default function PurchasedMovies() {
  const [filter, setFilter] = useState({ searchValue: "", selectedOption: "" });

  const {
    data: libraryResponse,
    isLoading,
    error,
  } = useGetMyLibraryQuery({
    access_type:
      filter.selectedOption === "All" ? undefined : filter.selectedOption,
    search: filter.searchValue || undefined,
  });

  const libraryData = libraryResponse?.data || [];

  console.log("libraryData", libraryData);
  const stats = libraryResponse?.stats || { total_buy: 0, total_rent: 0 };

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  if (isLoading) {
    return (
      <div className="my-5">
        <h2 className="text-2xl md:text-3xl font-medium">Purchased Movies</h2>
        <SearchWithOptions
          options={["All", "Purchase", "Rent"]}
          onChange={(data) => setFilter(data)}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-secondary animate-pulse rounded-md h-80"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    console.error("Error fetching library:", error);
  }
  return (
    <div className="my-5">
      <h2 className="text-2xl md:text-3xl font-medium">Purchased Movies</h2>
      <SearchWithOptions
        options={["All", "Purchase", "Rent"]}
        onChange={(data) => setFilter(data)}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {libraryData.length > 0 ? (
          libraryData.map((movie) => (
            <PurchasedMovieCard key={movie.film_id} movie={movie} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-muted-foreground">
              No movies found in your library
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
