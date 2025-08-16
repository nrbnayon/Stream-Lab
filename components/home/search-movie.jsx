"use client";

import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Search01Icon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SearchMovie({ className }) {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    //
  }, [searchValue]);
  return (
    <div className={cn("relative", className)}>
      <Input
        placeholder="Search Films"
        className="pl-10"
        type="text"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <HugeiconsIcon
        icon={Search01Icon}
        className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
      />

      {/* Search Preview */}
      {searchValue && (
        <div className="absolute top-full w-full bg-background/20 backdrop-blur-md border rounded-lg mt-2 left-0 max-h-96 overflow-y-auto custom-scrollbar p-3">
          <p className="text-lg font-medium text-muted-foreground">
            Search Preview
          </p>
          {/* Showing all movies here */}
          {movies.length > 0 ? (
            // TODO: Fetch and show data here!!
            <div className="space-y-3 mt-3">
              <Link href="" className="flex gap-3">
                <div className="w-24 h-32 bg-secondary rounded-lg"></div>
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-medium">Movie Name</p>
                  <p className="text-sm text-secondary-foreground">
                    Movie Description
                  </p>
                </div>
              </Link>
            </div>
          ) : (
            <p className="text-destructive text-sm text-center mt-3">
              No Movie Found
            </p>
          )}
        </div>
      )}
    </div>
  );
}
