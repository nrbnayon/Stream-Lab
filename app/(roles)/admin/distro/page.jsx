import DistroTransactions from "@/components/dashboard/admin/distro/distro-transactions";
import AdminDistroStats from "@/components/dashboard/admin/distro/stats";
import TopEarningDistro from "@/components/dashboard/admin/distro/top-earning-distro";

export default function AdminDistroPage() {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-medium">Distro Reports</h2>
      <p className="text-secondary-foreground">
        Monitor Distro performance and commissions.
      </p>

      <AdminDistroStats />
      <DistroTransactions />
      <TopEarningDistro />
    </div>
  );
}
