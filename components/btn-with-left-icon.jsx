import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function BtnWithLeftIcon({ icon, text, variant, className }) {
  return (
    <Button
      className={cn("flex items-center gap-2", className)}
      variant={variant}
    >
      {icon && icon}
      {text}
    </Button>
  );
}
