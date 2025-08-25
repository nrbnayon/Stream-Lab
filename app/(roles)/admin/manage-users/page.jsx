import AllUsersTable from "@/components/dashboard/admin/users/all-users-table";

export default function ManageUsersPage() {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-medium">User Management</h2>
      <p className="text-secondary-foreground">
        Manage all platform users from here.
      </p>
      <AllUsersTable />
    </div>
  );
}
