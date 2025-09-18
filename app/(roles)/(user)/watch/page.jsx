"use client";
import LatestDrama from "@/components/dashboard/user/watch/latest-drama";
import TrendingNow from "@/components/dashboard/user/watch/trending-now";
import HeroCarousel from "@/components/home/hero-carousel";
import SearchMovie from "@/components/home/search-movie";
import { moviesData } from "@/constants";
import { useGetMeQuery } from "@/redux/store/api/usersApi";

export default function UserDashboard() {
  const { data: user, isLoading: userLoading } = useGetMeQuery();

  const getUserDisplayName = () => {
    if (!user) return "";
    return user?.data?.full_name || user?.data?.email?.split("@")[0] || "User";
  };

  return (
    <div>
      <div className="flex justify-between gap-3 lg:gap-10 items-center flex-wrap">
        <div>
          <h2 className="text-2xl md:text-4xl">
            {userLoading
              ? "Welcome Back"
              : `Welcome${
                  getUserDisplayName() ? `, ${getUserDisplayName()}` : ""
                }`}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Discover high quality Films and TV shows, or share them to earn.
          </p>
        </div>
        <div className="w-lg min-w-sm">
          <SearchMovie />
        </div>
      </div>

      {/* Carousel */}
      <HeroCarousel moviesData={moviesData} renderFor="dashboard" />
      {/* Trending Movie */}
      <TrendingNow />
      {/* Latest Drama */}
      <LatestDrama />
    </div>
  );
}
