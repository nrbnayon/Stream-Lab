import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UsersTable from "../users-table";

export default function RecentUsers() {
  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle>New Signups</CardTitle>
        <CardDescription>
          See who recently registered and joined your community.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* TODO: Pass users props  */}
        <UsersTable />
      </CardContent>
    </Card>
  );
}
