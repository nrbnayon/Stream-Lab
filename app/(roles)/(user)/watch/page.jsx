import TrendingNow from "@/components/dashboard/user/watch/trending-now";
import HeroCarousel from "@/components/home/hero-carousel";
import { moviesData } from "@/constants";

export default function UserDashboard() {
  return (
    <div>
      <h2 className="text-4xl">Welcome Back</h2>
      <p className="text-muted-foreground text-lg">
        Discover amazing films and earn rewards
      </p>

      {/* Carousel */}
      <HeroCarousel moviesData={moviesData} renderFor="dashboard" />
      {/* Trending Movie */}
      <TrendingNow />
    </div>
  );
}
