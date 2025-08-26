"use client";
import { Share01Icon } from "@hugeicons/core-free-icons/index";
import { Button } from "./ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn, webShare } from "@/lib/utils";

export default function WebShare({ url = "", title = "", className }) {
  const handleShare = async (e) => {
    await webShare({
      title,
      url,
    });
  };
  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={handleShare}
      className={cn("bg-transparent", className)}
    >
      <HugeiconsIcon icon={Share01Icon} />
    </Button>
  );
}
