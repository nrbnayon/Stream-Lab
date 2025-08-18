import ReelbuxBalanceStats from "@/components/dashboard/user/reelbux/stats";
import TransactionHistory from "@/components/dashboard/user/reelbux/transaction-history";
import Image from "next/image";

export default function Reelbux() {
  return (
    <>
      <Image
        src="/reelbux-logo.png"
        height={100}
        width={200}
        alt="ReelBux logo"
      />
      <p className="text-secondary-foreground">
        Manage your balance and view transactions
      </p>
      <ReelbuxBalanceStats />
      <TransactionHistory />
    </>
  );
}
