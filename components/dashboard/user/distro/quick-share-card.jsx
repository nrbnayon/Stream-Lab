"use client";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/utils";
import { useState } from "react";

export default function QuickShareCard() {
  const [isCopied, setIsCopied] = useState(false);
  const url = "link - I'll update later";
  const handleCopy = async () => {
    const success = await copyToClipboard(url);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    }
  };
  return (
    <div className="border p-2 lg:p-5 rounded-md">
      <h3 className="text-xl">Midnight Dreams</h3>
      <p className="text-secondary-foreground text-sm">Movie</p>
      <Button variant="secondary" className="mt-3" onClick={handleCopy}>
        {isCopied ? "Copied" : "Quick Copy"}
      </Button>
    </div>
  );
}
