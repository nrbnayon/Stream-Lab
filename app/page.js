import Footer from "@/components/footer";
import HeroCarousel from "@/components/home/hero-carousel";
import LatestDrama from "@/components/home/latest-drama";
import TrendingNow from "@/components/home/trending-now";

export default function Home() {
  return (
    <div>
      <HeroCarousel />
      <div className="px-5 xl:px-0">
        <TrendingNow />
        <LatestDrama />
      </div>
      <Footer />
    </div>
  );
}
