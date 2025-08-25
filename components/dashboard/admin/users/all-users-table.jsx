"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UsersTable from "../users-table";
import SearchWithOptions from "../../search-with-options";
import { useEffect, useState } from "react";
export default function AllUsersTable() {
  const [filter, setFilter] = useState({ searchValue: "" });

  // TODO: Fetch and control data from here
  useEffect(() => {
    console.log(filter);
  }, [filter]);
  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle>Total Users — {547}</CardTitle>
        <CardDescription>View and manage registered users.</CardDescription>
      </CardHeader>
      <CardContent>
        <SearchWithOptions
          placeholder="Search User"
          onChange={(data) => setFilter(data)}
        />
        {/* TODO: Pass users props  */}
        <UsersTable />
      </CardContent>
    </Card>
  );
}
