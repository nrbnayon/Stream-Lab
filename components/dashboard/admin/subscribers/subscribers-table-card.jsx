// components/dashboard/admin/subscribers/subscribers-table-card.jsx
"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useGetAdminSubscribersQuery } from "@/redux/store/api/adminApi";
import SearchWithOptions from "../../search-with-options";
import RenderSubscribersTable from "./render-subscribers-table";
import Pagination from "../films/Pagination";

export default function SubscribersTableCard() {
  const [filter, setFilter] = useState({ searchValue: "" });
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: subscribersResponse,
    isLoading,
    error,
  } = useGetAdminSubscribersQuery({
    search: filter.searchValue?.trim() || undefined,
    page: currentPage,
  });

  const subscribers = subscribersResponse?.subscribers || [];
  const totalSubscribers = subscribersResponse?.total_subscriber || 0;
  const pagination = subscribersResponse?.pagination || {};

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    // Reset to first page when search changes
    setCurrentPage(1);
  }, [filter.searchValue]);

  if (isLoading && currentPage === 1) {
    return (
      <Card className="my-5">
        <CardHeader>
          <CardTitle>Total Subscribers — Loading...</CardTitle>
          <CardDescription>View and manage subscribers.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="bg-muted animate-pulse rounded h-12"
              ></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle>Total Subscribers — {totalSubscribers}</CardTitle>
        <CardDescription>View and manage subscribers.</CardDescription>
      </CardHeader>
      <CardContent>
        <SearchWithOptions
          placeholder="Search Subscriber"
          onChange={(data) => setFilter(data)}
        />

        <RenderSubscribersTable
          subscribers={subscribers}
          isLoading={isLoading}
          error={error}
        />

        {/* Pagination */}
        {pagination?.total_pages > 1 && (
          <div className="mt-4">
            <Pagination
              currentPage={pagination.current_page || currentPage}
              totalPages={pagination.total_pages}
              totalItems={pagination.count || totalSubscribers}
              onPageChange={handlePageChange}
              itemsPerPage={20}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
