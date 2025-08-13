import HeroCarousel from "@/components/home/hero-carousel";
import { moviesData } from "@/constants";

export default function Home() {
  return (
    <div>
      <HeroCarousel moviesData={moviesData} />

      <div className="h-svh"></div>
    </div>
  );
}
