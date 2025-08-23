"use client";

import { ArrowLeft02Icon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";

export default function AnalyticsHeading({ movieName = "" }) {
  return (
    <h2 className="text-2xl md:text-3xl lg:text-4xl flex gap-5">
      <HugeiconsIcon
        icon={ArrowLeft02Icon}
        className="transition-transform hover:-translate-x-1 cursor-pointer size-7 mt-0.5"
        onClick={() => history.back()}
      />
      {movieName} — Analytics
    </h2>
  );
}
