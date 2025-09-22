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
import {
  useGetAdminUsersQuery,
  useDeleteUserMutation,
} from "@/redux/store/api/adminApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AllUsersTable() {
  const [filter, setFilter] = useState({ searchValue: "" });
  const [deletedUsers, setDeletedUsers] = useState(new Set());

  const {
    data: usersResponse,
    isLoading,
    error,
    refetch,
  } = useGetAdminUsersQuery({
    search: filter.searchValue || undefined,
  });

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const users = usersResponse?.users || [];
  const totalUsers = usersResponse?.total_users || 0;

  const handleDeleteUser = async (userId) => {
    try {
      const result = await deleteUser(userId).unwrap();

      if (result.status === "success") {
        toast.success(result.message || "User deleted successfully");
        // Add to deleted users set for immediate UI update
        setDeletedUsers((prev) => new Set([...prev, userId]));
        // Refetch data to sync with server
        refetch();
      } else {
        toast.error(result.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Delete user error:", error);
      toast.error(
        error?.data?.message || "An error occurred while deleting the user"
      );
    }
  };

  // Filter out deleted users for immediate UI feedback
  const filteredUsers = users.filter((user) => !deletedUsers.has(user.id));

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  // Clear deleted users set when search changes to avoid filtering issues
  useEffect(() => {
    setDeletedUsers(new Set());
  }, [filter.searchValue]);

  if (isLoading) {
    return (
      <Card className="my-5">
        <CardHeader>
          <CardTitle>Loading Users...</CardTitle>
          <CardDescription>Fetching user data...</CardDescription>
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

  if (error) {
    console.error("Error fetching users:", error);
  }

  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle>Total Users — {totalUsers}</CardTitle>
        <CardDescription>View and manage registered users.</CardDescription>
      </CardHeader>
      <CardContent>
        <SearchWithOptions
          placeholder="Search User"
          onChange={(data) => setFilter(data)}
        />
        <UsersTable
          users={filteredUsers.map((user) => ({
            id: user.id,
            name: user.full_name,
            email: user.email,
            joiningDate: user.date_joined,
          }))}
          onDeleteUser={handleDeleteUser}
          isDeleting={isDeleting}
        />
      </CardContent>
    </Card>
  );
}
