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
import Link from "next/link";
import FilmDeleteDialog from "./film-delete-dialog";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo } from "react";
import Pagination from "./Pagination";

export default function AllFilmsTable({ films, isLoading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const paginatedData = useMemo(() => {
    if (!films) return { paginatedFilms: [], totalPages: 0 };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedFilms = films.slice(startIndex, endIndex);
    const totalPages = Math.ceil(films.length / itemsPerPage);

    return { paginatedFilms, totalPages };
  }, [films, currentPage, itemsPerPage]);

  if (isLoading) {
    return <div>Loading films...</div>;
  }

  if (!films || films.length === 0) {
    return <div>No films available.</div>;
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Upload Date</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Revenue</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.paginatedFilms.map((film) => (
            <TableRow key={film.id}>
              <TableCell className="flex items-center gap-3 justify-center">
                <Link
                  href={`/admin/watch/${film.id}`}
                  className="hover:underline"
                >
                  {film.title}
                </Link>
              </TableCell>
              <TableCell>{film.filmmaker}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    film.status === "Published"
                      ? "success"
                      : film.status === "Rejected"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {film.status}
                </Badge>
              </TableCell>
              <TableCell>{film.film_type}</TableCell>
              <TableCell>
                {new Date(film.release_date).toLocaleDateString()}
              </TableCell>
              <TableCell>{film.total_views}</TableCell>
              <TableCell
                className={film.total_earning > 0 ? "text-green-500" : ""}
              >
                {film.total_earning > 0 && "$"}
                {film.total_earning || 0}
              </TableCell>
              <TableCell>
                <FilmDeleteDialog film={film} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={paginatedData.totalPages}
        onPageChange={setCurrentPage}
        totalItems={films.length}
        itemsPerPage={itemsPerPage}
      />
    </>
  );
}
