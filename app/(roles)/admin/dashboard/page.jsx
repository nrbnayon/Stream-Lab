import RecentUsers from "@/components/dashboard/admin/admin-dashboard/recent-users";
import RevenueAndEarningActivity from "@/components/dashboard/admin/admin-dashboard/revenue-and-earning-activity";
import AdminDashboardStats from "@/components/dashboard/admin/admin-dashboard/stats";

export default function AdminDashboardPage() {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-medium">Growth Monitor</h2>
      <p className="text-secondary-foreground">
        Keep an eye on monthly revenue, performance stats, and your newest
        users.
      </p>

      <AdminDashboardStats />
      <RevenueAndEarningActivity />
      <RecentUsers />
    </div>
  );
}
