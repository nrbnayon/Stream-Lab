'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AllFilmsTable from "./all-films-table";
import { useGetAdminFilmsQuery } from "@/redux/store/api/adminApi";

export default function AllFilms() {
  const { data: filmsResponse, isLoading } = useGetAdminFilmsQuery();
  const films = filmsResponse?.track_all_films || [];

  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle>Films</CardTitle>
        <CardDescription>Track All Films</CardDescription>
      </CardHeader>
      <CardContent>
        <AllFilmsTable films={films} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
}
