// app/(roles)/admin/withdrawals/page.jsx
import WithdrawalStats from "@/components/dashboard/admin/payment/withdrawal-stats";
import WithdrawalsTable from "@/components/dashboard/admin/payment/withdrawals-table";

export default function AdminWithdrawalsPage() {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-medium">Withdrawal Management</h2>
      <p className="text-secondary-foreground">
        Review and manage user withdrawal requests. Approve or reject pending withdrawals.
      </p>

      <WithdrawalStats />
      <WithdrawalsTable />
    </div>
  );
}
