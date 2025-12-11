// app\(roles)\manager\films\page.jsx

import AllFilms from "@/components/dashboard/manager/films/all-films";
import FilmApproval from "@/components/dashboard/manager/films/film-approval";

export default function ManagerFilmsPage() {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-medium">Films</h2>
      <p className="text-secondary-foreground">
        Review and manage film submissions.
      </p>

      <FilmApproval />
      <AllFilms />
    </div>
  );
}
