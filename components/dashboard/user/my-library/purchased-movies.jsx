"use client";
import PurchasedMovieCard from "./purchased-movie-card";
import SearchWithOptions from "../../search-with-options";
import { useEffect, useState } from "react";
import { useGetMyLibraryQuery } from "@/redux/store/api/filmsApi";
import { Skeleton } from "@/components/ui/skeleton";

export default function PurchasedMovies() {
  const [filter, setFilter] = useState({
    searchValue: "",
    selectedOption: "All",
  });

  // Prepare query parameters - only include non-empty values
  const queryParams = {};

  // Map filter options to API values
  if (filter.selectedOption && filter.selectedOption !== "All") {
    if (filter.selectedOption === "Purchased") {
      queryParams.access_type = "Buy";
    } else if (filter.selectedOption === "Rented") {
      queryParams.access_type = "Rent";
    }
  }

  // Add search parameter if exists and not empty
  if (filter.searchValue && filter.searchValue.trim()) {
    queryParams.search = filter.searchValue.trim();
  }

  // Only pass queryParams if it has properties, otherwise pass undefined to get all data
  const apiParams =
    Object.keys(queryParams).length > 0 ? queryParams : undefined;

  const {
    data: libraryResponse,
    isLoading,
    error,
    refetch,
  } = useGetMyLibraryQuery(apiParams);

  const movies = libraryResponse?.data || [];
  const stats = libraryResponse?.stats || { total_buy: 0, total_rent: 0 };

  // Handle filter changes
  const handleFilterChange = (data) => {
    setFilter(data);
  };

  if (error) {
    return (
      <div className="my-5">
        <h2 className="text-2xl md:text-3xl font-medium">Purchased Movies</h2>
        <SearchWithOptions
          options={["All", "Purchased", "Rented"]}
          onChange={handleFilterChange}
        />
        <div className="text-center text-red-500 py-10">
          <p>
            Error loading movies:{" "}
            {error?.data?.message || error?.message || "Unknown error"}
          </p>
          <button
            onClick={() => refetch()}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl md:text-3xl font-medium">Purchased Movies</h2>
      </div>

      <SearchWithOptions
        options={["All", "Purchased", "Rented"]}
        onChange={handleFilterChange}
        defaultSelected={filter.selectedOption}
      />

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="h-44 w-full rounded-md" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-2 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Show current filter info */}
          <div className="mb-4 text-sm text-muted-foreground">
            {filter.selectedOption === "All"
              ? `Showing all movies (${movies.length} total)`
              : filter.selectedOption === "Purchased"
              ? `Showing purchased movies (${movies.length} found)`
              : `Showing rented movies (${movies.length} found)`}
            {filter.searchValue && ` matching "${filter.searchValue}"`}
          </div>

          {movies.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                {filter.searchValue
                  ? `No movies found matching "${
                      filter.searchValue
                    }" in ${filter.selectedOption.toLowerCase()} section.`
                  : filter.selectedOption === "All"
                  ? "You haven't purchased or rented any movies yet."
                  : filter.selectedOption === "Purchased"
                  ? `You haven't purchased any movies yet.`
                  : `You haven't rented any movies yet.`}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {movies.map((movie) => (
                <PurchasedMovieCard key={movie.film_id} movie={movie} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
