'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FilmApprovalTable from "./film-approval-table";
import { useGetAdminFilmsQuery } from "@/redux/store/api/adminApi";

export default function FilmApproval() {
    const { data: filmsResponse, isLoading } = useGetAdminFilmsQuery();
    const reviewFilms = filmsResponse?.review_films || [];

    console.log("All the films::", filmsResponse);
  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle>Film Approval</CardTitle>
        <CardDescription>Film Approval & Management.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* TODO: Pass users props  */}
        <FilmApprovalTable reviewFilms={reviewFilms} isLoading={isLoading}  />
      </CardContent>
    </Card>
  );
}
