import SubscribersTableCard from "@/components/dashboard/admin/subscribers/subscribers-table-card";

export default function AdminSubscribersPage() {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-medium">
        Subscriber Management
      </h2>
      <p className="text-secondary-foreground">
        Manage all subscribers from here.
      </p>

      <SubscribersTableCard />
    </div>
  );
}
