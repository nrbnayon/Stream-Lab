"use client";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { copyToClipboard } from "@/lib/utils";
import DistroPopup from "@/components/DistroPopup";
import { useGetMeQuery } from "@/redux/store/api/usersApi";
import { useState } from "react";
import Image from "next/image";
import { Share2 } from "lucide-react";

export default function QuickShareCard({ film }) {
  const isMobile = useIsMobile();
  const [isCopied, setIsCopied] = useState(false);

  const { data: userData, isLoading: userLoading } = useGetMeQuery();
  const referralCode = userData?.data?.referral_code || "user123";

  const { film_id, film_title, film_type, thumbnail } = film;

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
    <div className="group relative rounded-lg overflow-hidden bg-black h-40">
      {/* Thumbnail Background */}
      {thumbnail ? (
        <Image
          src={thumbnail}
          alt={film_title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          priority={false}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-3">
        {/* Top Right Icon */}
        <div className="flex justify-end">
          <div className="bg-cyan-500/20 backdrop-blur-sm rounded-full p-2 border border-cyan-500/50">
            <Share2 className="w-4 h-4 text-cyan-400" />
          </div>
        </div>

        {/* Bottom Content */}
        <div className="space-y-2">
          <div>
            <h3 className="font-semibold text-white text-sm md:text-base line-clamp-2">
              {film_title}
            </h3>
            <p className="text-xs md:text-sm text-gray-300">{film_type}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="secondary"
              onClick={handleCopy}
              size="sm"
              className="flex-1 text-xs md:text-sm h-8"
            >
              {isCopied ? "Copied!" : "Quick Copy"}
            </Button>

            <DistroPopup
              movieId={film_id}
              movieTitle={film_title}
              distributionUrl={distributionUrl}
              className="flex-shrink-0"
              textDescription="Share this film and earn 70% commission when someone purchases from your link."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
