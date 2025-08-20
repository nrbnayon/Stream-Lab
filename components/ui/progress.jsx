"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const colorMap = {
  primary: ["bg-primary", "bg-primary/20"],
  red: ["bg-red-500", "bg-red-500/20"],
  green: ["bg-green-500", "bg-green-500/20"],
  blue: ["bg-blue-500", "bg-blue-500/20"],
};

function Progress({ className, color = "primary", value, ...props }) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        `${colorMap[color][1]} relative h-2 w-full overflow-hidden rounded-full`,
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={`${colorMap[color][0]} h-full w-full flex-1 transition-all`}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
