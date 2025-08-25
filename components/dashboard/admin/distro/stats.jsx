import React from "react";
import StatsCard from "../stats-card";
import { adminDistroStats } from "@/constants";

export default function AdminDistroStats() {
  return (
    <div className="grid md:grid-cols-3 gap-2 md:gap-3 lg:gap-5 my-5">
      {adminDistroStats.map((stat, i) => (
        <StatsCard key={i} stat={stat} />
      ))}
    </div>
  );
}
