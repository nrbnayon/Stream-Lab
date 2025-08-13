import HeroCarousel from "@/components/home/hero-carousel";
import TrendingNow from "@/components/home/trending-now";
import { moviesData } from "@/constants";

export default function Home() {
  return (
    <div>
      <HeroCarousel moviesData={moviesData} />

      <TrendingNow />

      <div className="h-svh"></div>
    </div>
  );
}
