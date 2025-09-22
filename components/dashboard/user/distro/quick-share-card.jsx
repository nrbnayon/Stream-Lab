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
import DistroPopup from "@/components/DistroPopup";
import { useGetMeQuery } from "@/redux/store/api/usersApi";
import { useState } from "react";

export default function QuickShareCard({ film }) {
  const isMobile = useIsMobile();
  const [isCopied, setIsCopied] = useState(false);

  const { data: userData, isLoading: userLoading } = useGetMeQuery();
  const referralCode = userData?.data?.referral_code || "user123";

  const { film_id, film_title, film_type } = film;

  // Generate distribution URL with same structure as MovieCard
  const distributionUrl = `${process.env.NEXT_PUBLIC_LIVE_URL}/watch/${film_id}?referral=${referralCode}`;

  const handleCopy = async () => {
    const success = await copyToClipboard(distributionUrl);
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
      <CardFooter className="flex gap-2">
        <Button
          variant="secondary"
          onClick={handleCopy}
          size={isMobile ? "sm" : "default"}
          className="flex-1"
        >
          {isCopied ? "Copied" : "Quick Copy"}
        </Button>

        <DistroPopup
          movieId={film_id}
          movieTitle={film_title}
          distributionUrl={distributionUrl}
          className="flex-shrink-0"
        />
      </CardFooter>
    </Card>
  );
}
