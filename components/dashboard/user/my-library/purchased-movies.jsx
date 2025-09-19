"use client";
import PurchasedMovieCard from "./purchased-movie-card";
import SearchWithOptions from "../../search-with-options";
import { useEffect, useState } from "react";
import { useGetMyLibraryQuery } from "@/redux/store/api/filmsApi";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PurchasedMovies() {
  const [filter, setFilter] = useState({
    searchValue: "",
    selectedOption: "All",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

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

  // Add pagination parameters
  queryParams.page = currentPage;
  queryParams.page_size = itemsPerPage;

  const {
    data: libraryResponse,
    isLoading,
    error,
    refetch,
  } = useGetMyLibraryQuery(queryParams);

  const movies = libraryResponse?.data || [];
  const totalCount = libraryResponse?.count || 0;
  const hasNext = libraryResponse?.next !== null;
  const hasPrevious = libraryResponse?.previous !== null;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  // Handle filter changes
  const handleFilterChange = (data) => {
    setFilter(data);
  };

  // Handle pagination
  const handlePreviousPage = () => {
    if (hasPrevious && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (hasNext && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
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
            Movie not found:{" "}
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
          {Array.from({ length: itemsPerPage }).map((_, index) => (
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
          {/* Show current filter info and pagination info */}
          <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div className="text-sm text-muted-foreground">
              {filter.selectedOption === "All"
                ? `Showing all movies`
                : filter.selectedOption === "Purchased"
                ? `Showing purchased movies`
                : `Showing rented movies`}
              {filter.searchValue && ` matching "${filter.searchValue}"`}
            </div>
            {totalCount > 0 && (
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages} ({totalCount} total)
              </div>
            )}
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
            <>
              {/* Movies Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
                {movies.map((movie) => (
                  <PurchasedMovieCard key={movie.film_id} movie={movie} />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Previous Button */}
                  <Button
                    variant="outline"
                    onClick={handlePreviousPage}
                    disabled={!hasPrevious}
                    className="w-full sm:w-auto"
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>

                  {/* Page Numbers */}
                  <div className="flex flex-wrap items-center gap-1 justify-center">
                    {getPageNumbers().map((pageNum, index) => (
                      <div key={index}>
                        {pageNum === "..." ? (
                          <span className="px-3 py-2">...</span>
                        ) : (
                          <Button
                            variant={
                              pageNum === currentPage ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() => handlePageClick(pageNum)}
                            className="min-w-[40px]"
                          >
                            {pageNum}
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Next Button */}
                  <Button
                    variant="outline"
                    onClick={handleNextPage}
                    disabled={!hasNext}
                    className="w-full sm:w-auto"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
