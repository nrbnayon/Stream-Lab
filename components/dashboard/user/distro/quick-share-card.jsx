"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { copyToClipboard } from "@/lib/utils";
import { useState } from "react";

export default function QuickShareCard({ film }) {
  const isMobile = useIsMobile();
  const [isCopied, setIsCopied] = useState(false);

  const { film_title, film_type, quick_copy } = film;
  const url = quick_copy;

  const handleCopy = async () => {
    const success = await copyToClipboard(url);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-medium text-lg md:text-xl">
          {film_title}
        </CardTitle>
        <CardDescription>{film_type}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          variant="secondary"
          onClick={handleCopy}
          size={isMobile ? "sm" : "default"}
        >
          {isCopied ? "Copied" : "Quick Copy"}
        </Button>
      </CardFooter>
    </Card>
  );
}
