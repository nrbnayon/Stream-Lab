import Footer from "@/components/footer";
import HeroCarousel from "@/components/home/hero-carousel";
import LatestDrama from "@/components/home/latest-drama";
import TrendingNow from "@/components/home/trending-now";
import { moviesData } from "@/constants";

export default function Home() {
  return (
    <div>
      <div className="lg:h-dvh">
        <HeroCarousel moviesData={moviesData} />
      </div>
      <TrendingNow />
      <LatestDrama />
      <Footer />
    </div>
  );
}
