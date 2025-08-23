import Footer from "@/components/footer";
import HeroCarousel from "@/components/home/hero-carousel";
import LatestDrama from "@/components/home/latest-drama";
import TrendingNow from "@/components/home/trending-now";
import { moviesData } from "@/constants";

export default function Home() {
  return (
    <div>
      <HeroCarousel moviesData={moviesData} />
      <div className="px-5 xl:px-0">
        <TrendingNow />
        <LatestDrama />
      </div>
      <Footer />
    </div>
  );
}
