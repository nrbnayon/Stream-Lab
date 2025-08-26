import LatestDrama from "@/components/dashboard/user/watch/latest-drama";
import TrendingNow from "@/components/dashboard/user/watch/trending-now";
import HeroCarousel from "@/components/home/hero-carousel";
import SearchMovie from "@/components/home/search-movie";
import { moviesData } from "@/constants";

export default function UserDashboard() {
  return (
    <div>
      <div className="flex justify-between gap-3 lg:gap-10 items-center flex-wrap">
        <div>
          <h2 className="text-2xl md:text-4xl">Welcome Back</h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Discover amazing films and earn rewards
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
