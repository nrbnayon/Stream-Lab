"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export default function PaymentTriggerBtn({ children, className, ...props }) {
  const isMobile = useIsMobile();
  return (
    <Button
      {...props}
      className={cn("", className)}
      size={isMobile ? "sm" : "default"}
    >
      {children}
    </Button>
  );
}
