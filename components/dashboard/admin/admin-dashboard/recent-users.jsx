"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UsersTable from "../users-table";
import {
  useGetAdminDashboardQuery,
  useDeleteUserMutation,
} from "@/redux/store/api/adminApi";
import { toast } from "sonner";
import { useState } from "react";

export default function RecentUsers() {
  const { data: dashboardResponse, refetch } = useGetAdminDashboardQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [deletedUsers, setDeletedUsers] = useState(new Set());

  const newSignups = dashboardResponse?.new_signups || [];

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
  const filteredUsers = newSignups.filter(
    (user) => !deletedUsers.has(user.user_id)
  );

  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle>New Signups</CardTitle>
        <CardDescription>
          See who recently registered and joined your community.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UsersTable
          users={filteredUsers.map((user) => ({
            id: user.user_id,
            name: user.full_name,
            email: user.email,
            joiningDate: user.joining_date,
          }))}
          onDeleteUser={handleDeleteUser}
          isDeleting={isDeleting}
        />
      </CardContent>
    </Card>
  );
}
