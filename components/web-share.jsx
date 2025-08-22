"use client";
import { Share01Icon } from "@hugeicons/core-free-icons/index";
import { Button } from "./ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { webShare } from "@/lib/utils";

export default function WebShare({ url = "", title = "" }) {
  const handleShare = async (e) => {
    await webShare({
      title,
      url,
    });
  };
  return (
    <Button size="icon" variant="ghost" onClick={handleShare}>
      <HugeiconsIcon icon={Share01Icon} />
    </Button>
  );
}
