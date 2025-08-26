"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { copyToClipboard } from "@/lib/utils";
import { Copy01Icon, TickDouble02Icon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";

export default function DistroCode() {
  const distro = "https://streamlab.com/distro/123456789";
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    const success = await copyToClipboard(distro);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <>
      <Label>Distro Code</Label>
      <div className="flex items-center gap-3">
        <Input disabled={true} defaultValue={distro} />
        <Button
          variant="secondary"
          className="py-3"
          size="responsive"
          onClick={onCopy}
        >
          <HugeiconsIcon icon={copied ? TickDouble02Icon : Copy01Icon} />
        </Button>
      </div>
    </>
  );
}
