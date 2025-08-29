// app\(roles)\(user)\my-titles\page.jsx
import MoviesTable from "@/components/dashboard/user/my-titles/movies-table";
import MyTitlesStats from "@/components/dashboard/user/my-titles/my-titles-stats";

export default function MyFilms() {
  return (
    <>
      <h2 className="text-2xl md:text-4xl font-medium">My Titles</h2>
      <p className="text-secondary-foreground">Manage your films here</p>
      <MyTitlesStats />
      <MoviesTable />
    </>
  );
}
