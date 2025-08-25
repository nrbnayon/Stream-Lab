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
import { useEffect, useState } from "react";

const userFilms = [
  {
    id: "1",
    film_title: "The Lost Journey",
    film_id: "F001",
    status: "Published",
    film_type: "Drama",
    views: 1200,
    earning: 450,
  },
  {
    id: "2",
    film_title: "Shadows of Time",
    film_id: "F002",
    status: "Under Review",
    film_type: "Thriller",
    views: 0,
    earning: 0,
  },
  {
    id: "3",
    film_title: "Ocean’s Whisper",
    film_id: "F003",
    status: "Published",
    film_type: "Romance",
    views: 980,
    earning: 390,
  },
  {
    id: "4",
    film_title: "City Lights",
    film_id: "F004",
    status: "Rejected",
    film_type: "Comedy",
    views: 0,
    earning: 0,
  },
  {
    id: "5",
    film_title: "The Silent Forest",
    film_id: "F005",
    status: "Published",
    film_type: "Documentary",
    views: 1750,
    earning: 600,
  },
  {
    id: "6",
    film_title: "Breaking Dawn",
    film_id: "F006",
    status: "Published",
    film_type: "Fantasy",
    views: 2100,
    earning: 820,
  },
  {
    id: "7",
    film_title: "The Hidden Truth",
    film_id: "F007",
    status: "Rejected",
    film_type: "Crime",
    views: 0,
    earning: 0,
  },
  {
    id: "8",
    film_title: "Sky Beyond Stars",
    film_id: "F008",
    status: "Published",
    film_type: "Sci-Fi",
    views: 3400,
    earning: 1200,
  },
  {
    id: "9",
    film_title: "Whispers of Hope",
    film_id: "F009",
    status: "Under Review",
    film_type: "Drama",
    views: 0,
    earning: 0,
  },
  {
    id: "10",
    film_title: "Dance of Flames",
    film_id: "F010",
    status: "Published",
    film_type: "Action",
    views: 2750,
    earning: 950,
  },
];

export default function MoviesTable() {
  const [filter, setFilter] = useState({ searchValue: "", selectedOption: "" });

  // TODO: Fetch and control data from here
  useEffect(() => {
    console.log(filter);
  }, [filter]);
  return (
    <div className="my-5 bg-secondary py-10 px-5 rounded-md">
      <h3 className="text-xl md:text-2xl font-medium">All of your films</h3>
      <p className="text-secondary-foreground">
        Manage your uploaded films here
      </p>
      <SearchWithOptions
        options={["All", "Published", "Under Review", "Rejected"]}
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
              <TableRow key={film.id}>
                <TableCell>
                  <Link
                    href={`/film/${film.film_id}`}
                    className="hover:underline"
                  >
                    {film.film_title}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      film.status === "Published"
                        ? "success"
                        : film.status === "Under Review"
                        ? "warning"
                        : "destructive"
                    }
                  >
                    {film.status}
                  </Badge>
                </TableCell>
                <TableCell>{film.film_type}</TableCell>
                <TableCell>{film.views || "—"}</TableCell>
                <TableCell className={`${film.earning && "text-green-500"}`}>
                  {film.earning > 0 ? `$${film.earning}` : "—"}
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
    </div>
  );
}
