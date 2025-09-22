"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { useApproveOrRejectFilmMutation } from "@/redux/store/api/adminApi";
import { useState, useMemo } from "react";
import Pagination from "./Pagination";
import CircularLoader from "@/components/ui/CircularLoader";

export default function FilmApprovalTable({ reviewFilms, isLoading }) {
  const [approveOrRejectFilm, { isLoading: isSubmitting }] =
    useApproveOrRejectFilmMutation();
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const paginatedData = useMemo(() => {
    if (!reviewFilms) return { paginatedFilms: [], totalPages: 0 };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedFilms = reviewFilms.slice(startIndex, endIndex);
    const totalPages = Math.ceil(reviewFilms.length / itemsPerPage);

    return { paginatedFilms, totalPages };
  }, [reviewFilms, currentPage, itemsPerPage]);

  const handleApproveOrReject = async (filmId, action) => {
    try {
      await approveOrRejectFilm({
        film_id: filmId,
        action: action,
      }).unwrap();
      console.log(`Film ${action.toLowerCase()}d successfully`);
    } catch (error) {
      console.error(`Failed to ${action.toLowerCase()} film:`, error);
    }
  };

  if (isLoading) {
    return (
      <CircularLoader
        size={60}
        thickness={5}
        gap={4}
        message=""
        outerColor="border-primary"
        innerColor="border-red-500"
        textColor="text-blue-600"
        className="py-12"
        showMessage={false}
      />
    );
  }

  if (!reviewFilms || reviewFilms.length === 0) {
    return <div>No films pending review.</div>;
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Preview</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.paginatedFilms.map((film) => (
            <TableRow key={film.id}>
              <TableCell className="flex items-center gap-3">
                <Link href={`/admin/watch/${film.id}`} className="shrink-0">
                  <Image
                    src={film.thumbnail || "/placeholder-image.jpg"}
                    alt={film.title}
                    width={500}
                    height={500}
                    className="rounded-sm object-cover aspect-[1/3] w-20 h-20"
                  />
                </Link>
                <div className="min-w-0">
                  <h3 className="text-lg md:text-xl font-medium truncate">
                    {film.title}
                  </h3>
                  <p className="text-left text-secondary-foreground">
                    {film.film_type}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                {new Date(film.release_date).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex gap-3 justify-center">
                  <Button
                    variant="secondary"
                    onClick={() => handleApproveOrReject(film.id, "Approve")}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Approve"}
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleApproveOrReject(film.id, "Reject")}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Reject"}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={paginatedData.totalPages}
        onPageChange={setCurrentPage}
        totalItems={reviewFilms.length}
        itemsPerPage={itemsPerPage}
      />
    </>
  );
}
