"use client";
import React from "react";
import DistroPopup from "@/components/DistroPopup";
import { useGetMeQuery } from "@/redux/store/api/usersApi";
import Image from "next/image";

export default function QuickShareCard({ film }) {
  const { data: userData } = useGetMeQuery();
  const referralCode = userData?.data?.referral_code || "user123";

  const { film_id, film_title, film_type, thumbnail } = film;

  // Generate distribution URL with same structure as MovieCard
  const distributionUrl = `${process.env.NEXT_PUBLIC_LIVE_URL}/watch/${film_id}?referral=${referralCode}`;

  return (
    <div className="flex items-center justify-between p-4 bg-[#111111] border border-white/5 rounded-xl hover:bg-[#161616] transition-colors duration-300">
      {/* Left Content: Text */}
      <div className="flex flex-col gap-1 min-w-0 flex-1 mr-4">
        <h3 className="text-white text-lg font-bold leading-tight truncate">
          {film_title}
        </h3>
        <p className="text-gray-500 text-sm font-medium">{film_type}</p>
      </div>

      {/* Middle Content: Thumbnail */}
      <div className="relative w-32 h-20 rounded-md overflow-hidden flex-shrink-0 bg-zinc-800 mx-4 shadow-sm border border-white/5">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={film_title}
            fill
            className="object-cover"
            priority={false}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900" />
        )}
        {/* Optional overlay could go here, but design looks clean */}
      </div>

      {/* Right Content: Icon Action */}
      <div className="flex-shrink-0 ml-2">
        <DistroPopup
          movieId={film_id}
          movieTitle={film_title}
          distributionUrl={distributionUrl}
          className="hover:scale-110 transition-transform duration-300"
          textDescription="Share this film and earn 70% commission when someone purchases from your link."
          iconSize={42} 
        />
      </div>
    </div>
  );
}
