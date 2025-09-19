// Updated WebShare Component
"use client";
import { Share01Icon } from "@hugeicons/core-free-icons/index";
import { Button } from "./ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn, webShareFunction } from "@/lib/utils";

export default function WebShare({ url = "", title = "", className }) {
  const handleShare = async (e) => {
    await webShareFunction({
      title,
      url,
    });
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={handleShare}
      className={cn("bg-transparent hover:bg-primary/10", className)}
    >
      <HugeiconsIcon icon={Share01Icon} />
    </Button>
  );
}
