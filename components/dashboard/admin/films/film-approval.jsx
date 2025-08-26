import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FilmApprovalTable from "./film-approval-table";

export default function FilmApproval() {
  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle>Film Approval</CardTitle>
        <CardDescription>Film Approval & Management.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* TODO: Pass users props  */}
        <FilmApprovalTable />
      </CardContent>
    </Card>
  );
}
