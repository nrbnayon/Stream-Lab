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
        Your ReelBux digital wallet is dollar-for-dollar credit you can use on
        films, series, upgrades, and AI Creator tools. <br /> You can even
        transfer your Distro sales into ReelBux and keep your funds ready for
        what you want next.
      </p>
      <ReelbuxBalanceStats 
        onToggleTransactions={() => setShowTransactions(!showTransactions)}
        showTransactions={showTransactions}
      />
      {showTransactions && <TransactionHistory />}
    </>
  );
}
