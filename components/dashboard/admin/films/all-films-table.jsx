import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { adminFilmsList } from "@/constants";
import { Delete02Icon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import FilmDeleteDialog from "./film-delete-dialog";
import { Badge } from "@/components/ui/badge";

export default function AllFilmsTable() {
  return (
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
        {adminFilmsList.map((film) => (
          <TableRow key={film.id}>
            <TableCell className="flex items-center gap-3 justify-center">
              {/* TODO: Replace the link */}
              <Link href={`/film/somewhere`} className="hover:underline">
                {film.film_title}
              </Link>
            </TableCell>
            <TableCell>{film.user}</TableCell>
            <TableCell>
              <Badge
                variant={
                  film.status === "published" ? "success" : "destructive"
                }
              >
                {film.status}
              </Badge>
            </TableCell>
            <TableCell>{film.film_type}</TableCell>
            <TableCell>{film.upload_date}</TableCell>
            <TableCell>{film.views}</TableCell>
            <TableCell className={film.revenue > 0 && "text-green-500"}>
              {film.revenue > 0 && "$"}
              {film.revenue}
            </TableCell>
            <TableCell>
              <FilmDeleteDialog film={film} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
