// app\(roles)\(user)\reelbux\page.jsx
"use client";
import { useState } from "react";
import ReelbuxBalanceStats from "@/components/dashboard/user/reelbux/stats";
import TransactionHistory from "@/components/dashboard/user/reelbux/transaction-history";
import Image from "next/image";

export default function Reelbux() {
  const [showTransactions, setShowTransactions] = useState(false);

  return (
    <>
      <Image
        src="/reelbux-logo.png"
        height={100}
        width={200}
        alt="ReelBux logo"
        className="w-40 md:w-52 lg:w-60 mb-2"
      />
      <p className="text-secondary-foreground">
        ReelBux is JusB’s built-in wallet for use across the platform
      </p>
      <ReelbuxBalanceStats
        onToggleTransactions={() => setShowTransactions(!showTransactions)}
        showTransactions={showTransactions}
      />
      {showTransactions && <TransactionHistory />}
    </>
  );
}
