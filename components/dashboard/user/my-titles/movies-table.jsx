// components/dashboard/user/my-titles/movies-table.jsx
"use client";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Chart03Icon,
  PencilEdit02Icon,
} from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import SearchWithOptions from "../../search-with-options";
import FilmEditDialog from "./edit-film/film-edit-dialog";
import { useGetMyTitlesQuery } from "@/redux/store/api/filmsApi";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function MoviesTable() {
  const [filter, setFilter] = useState({ searchValue: "", selectedOption: "" });
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: titlesResponse,
    isLoading,
    error,
  } = useGetMyTitlesQuery({
    status: filter.selectedOption === "All" ? undefined : filter.selectedOption,
    search: filter.searchValue || undefined,
    page: currentPage,
    page_size: 20,
  });

  const userFilms = titlesResponse?.results?.data || [];
  const stats = titlesResponse?.results?.stats || {};
  const totalCount = titlesResponse?.count || 0;
  const hasNext = titlesResponse?.next !== null;
  const hasPrevious = titlesResponse?.previous !== null;

  console.log("Get all response::", titlesResponse);

  useEffect(() => {
    console.log(filter);
    // Reset to page 1 when filter changes
    setCurrentPage(1);
  }, [filter]);

  const handleNextPage = () => {
    if (hasNext) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (hasPrevious) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="my-5 bg-secondary py-10 px-5 rounded-md">
        <h3 className="text-xl md:text-2xl font-medium">All of your films</h3>
        <p className="text-secondary-foreground">Loading your films...</p>
        <div className="mt-5 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-muted animate-pulse rounded h-12"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    console.error("Error fetching my titles:", error);
  }

  return (
    <div className="my-5 bg-secondary py-10 px-5 rounded-md">
      <h3 className="text-xl md:text-2xl font-medium">All of your films</h3>
      <p className="text-secondary-foreground">
        Manage your uploaded films here
      </p>
      <SearchWithOptions
        options={["All", "Published", "Review", "Rejected"]}
        onChange={(data) => setFilter(data)}
      />
      {/* rendering Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Earning</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userFilms.length > 0 ? (
            userFilms.map((film) => (
              <TableRow key={film.film_id}>
                <TableCell>
                  <Link
                    href={`/film/${film.film_id}`}
                    className="hover:underline"
                  >
                    {film.title}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      film.status === "Published"
                        ? "success"
                        : film.status === "Review"
                        ? "warning"
                        : "destructive"
                    }
                  >
                    {film.status === "Review" ? "Under Review" : film.status}
                  </Badge>
                </TableCell>
                <TableCell>{film.film_type}</TableCell>
                <TableCell>{film.views || "—"}</TableCell>
                <TableCell
                  className={`${film.total_earning && "text-green-500"}`}
                >
                  {film.total_earning > 0 ? `$${film.total_earning}` : "—"}
                </TableCell>
                <TableCell className="flex gap-1 justify-center">
                  {film.status === "Published" ? (
                    <>
                      <FilmEditDialog
                        trigger={
                          <HugeiconsIcon
                            icon={PencilEdit02Icon}
                            className="cursor-pointer"
                          />
                        }
                        filmID={film.film_id}
                      />

                      <Link href={`my-titles/analytics/${film.film_id}`}>
                        <HugeiconsIcon
                          icon={Chart03Icon}
                          className="text-[#16A4AE]"
                        />
                      </Link>
                    </>
                  ) : (
                    "—"
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={6} className="text-center text-destructive">
                You haven&apos;t added any film.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {totalCount > 20 && (
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-secondary-foreground">
            Showing {(currentPage - 1) * 20 + 1} to{" "}
            {Math.min(currentPage * 20, totalCount)} of {totalCount} results
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={!hasPrevious}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={!hasNext}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
