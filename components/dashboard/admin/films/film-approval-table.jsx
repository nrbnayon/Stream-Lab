import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { moviesData } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export default function FilmApprovalTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Preview</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {moviesData.slice(0, 3).map((movie) => (
          <TableRow key={movie.id}>
            <TableCell className="flex items-center gap-3">
              {/* TODO: Replace the link */}
              <Link href={`/film/somewhere`}>
                <Image
                  src={movie.thumbnail_url}
                  alt={movie.title}
                  width={50}
                  height={100}
                />
              </Link>
              <div>
                <h3 className="text-lg md:text-xl font-medium">
                  {movie.title}
                </h3>
                <p className="text-left text-secondary-foreground">
                  {movie.type}
                </p>
              </div>
            </TableCell>
            <TableCell>20 April 2011</TableCell>
            <TableCell>
              <div className="flex gap-3 justify-center">
                <Button variant="secondary">Approve</Button>
                <Button variant="destructive">Reject</Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
