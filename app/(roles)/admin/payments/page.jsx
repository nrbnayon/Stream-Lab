import PaymentMethods from "@/components/dashboard/admin/payment/payment-methods";
import RecentTransactionsTable from "@/components/dashboard/admin/payment/recent-transactions-table";
import AdminPaymentsStats from "@/components/dashboard/admin/payment/stats";
import TransferStatus from "@/components/dashboard/admin/payment/transfer-status";

export default function AdminPaymentsPage() {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-medium">Payments Overview</h2>
      <p className="text-secondary-foreground">
        Track payouts, fees, and transaction statuses in real time.
      </p>

      <AdminPaymentsStats />
      <RecentTransactionsTable />
      <div className="grid lg:grid-cols-2 gap-5 my-5">
        <PaymentMethods />
        <TransferStatus />
      </div>
    </div>
  );
}
