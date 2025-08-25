"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import SearchWithOptions from "../../search-with-options";
import RenderSubscribersTable from "./render-subscribers-table";

export default function SubscribersTableCard() {
  const [filter, setFilter] = useState({ searchValue: "" });
  // TODO: Fetch and control data from here
  useEffect(() => {
    console.log(filter);
  }, [filter]);
  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle>Total Subscribers — {241}</CardTitle>
        <CardDescription>View and manage subscribers.</CardDescription>
      </CardHeader>
      <CardContent>
        <SearchWithOptions
          placeholder="Search Subscriber"
          onChange={(data) => setFilter(data)}
        />
        {/* TODO: Pass users props  */}
        <RenderSubscribersTable />
      </CardContent>
    </Card>
  );
}
