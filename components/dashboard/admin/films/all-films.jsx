import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AllFilmsTable from "./all-films-table";

export default function AllFilms() {
  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle>Films</CardTitle>
        <CardDescription>Track All Films</CardDescription>
      </CardHeader>
      <CardContent>
        {/* TODO: Pass users props  */}
        <AllFilmsTable />
      </CardContent>
    </Card>
  );
}
