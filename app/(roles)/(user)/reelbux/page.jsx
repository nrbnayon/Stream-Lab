import ReelbuxBalanceStats from "@/components/dashboard/user/reelbux/stats";

export default function Reelbux() {
  return (
    <>
      {/* TODO: Add logo here */}
      <h2 className="text-4xl">ReelBux Logo will be placed here</h2>
      <p className="text-secondary-foreground">
        Manage your balance and view transactions
      </p>
      <ReelbuxBalanceStats />
    </>
  );
}
