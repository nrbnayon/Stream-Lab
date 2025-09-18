"use client";

import { cn } from "@/lib/utils";
import { Search01Icon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useState, useMemo } from "react";
import InputField from "../input-field";
import { useSearchFilmsQuery } from "@/redux/store/api/filmsApi";
import { useDebounce } from "@/components/ui/multiselect";

export default function SearchMovie({ className }) {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchTerm = useDebounce(searchValue, 500);

  // Only search when we have a search term
  const { data: searchResponse, isLoading } = useSearchFilmsQuery(
    debouncedSearchTerm,
    {
      skip: !debouncedSearchTerm || debouncedSearchTerm.length < 2,
    }
  );

  // console.log("searchResponse", searchResponse);

  const movies = useMemo(() => searchResponse?.data || [], [searchResponse]);

  return (
    <div className={cn("relative", className)}>
      <InputField
        leftIcon={
          <HugeiconsIcon
            icon={Search01Icon}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
        }
        placeholder="Search Films"
        value={searchValue}
        setValue={setSearchValue}
      />

      {/* Search Preview */}
      {searchValue && (
        <div className="absolute top-full w-full bg-background/20 backdrop-blur-md border rounded-lg mt-2 left-0 max-h-96 overflow-y-auto custom-scrollbar p-3">
          {isLoading ? (
            <p className="text-center text-muted-foreground">Searching...</p>
          ) : (
            <>
              <p className="text-lg font-medium text-muted-foreground">
                Search Results
              </p>
              {/* Showing search results */}
            </>
          )}
          {movies.length > 0 ? (
            <div className="space-y-3 mt-3">
              {movies.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/film/${movie.id}`}
                  className="flex gap-3 hover:bg-secondary/50 p-2 rounded-md"
                >
                  <div className="w-16 h-24 bg-secondary rounded-lg flex-shrink-0">
                    {movie.thumbnail && (
                      <img
                        src={movie.thumbnail}
                        alt={movie.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <p className="text-lg font-medium truncate">
                      {movie.title}
                    </p>
                    <p className="text-sm text-secondary-foreground">
                      {movie.film_type || "Movie"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : !isLoading && searchValue.length >= 2 ? (
            <p className="text-destructive text-sm text-center mt-3">
              No Movie Found
            </p>
          ) : null}
          {searchValue.length > 0 && searchValue.length < 2 && (
            <p className="text-muted-foreground text-sm text-center mt-3">
              Type at least 2 characters to search
            </p>
          )}
        </div>
      )}
    </div>
  );
}
