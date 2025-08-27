"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// custom CSS
import "../../styles/swiper-carousel.css";
import Image from "next/image";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlayIcon } from "@hugeicons/core-free-icons/index";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import NavBar from "./nav-bar";
import { truncateText } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import TrailerPopup from "../trailer-popup";

export default function HeroCarousel({ moviesData, renderFor = "home" }) {
  const swiperRef = useRef(null);
  const isMobile = useIsMobile();

  useGSAP(
    () => {
      const swiper = swiperRef.current.swiper;

      swiper.on("slideChangeTransitionStart", () => {
        gsap.fromTo(
          "#slide-details",
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            delay: 0.5,
          }
        );
      });
    },
    { scope: swiperRef, dependencies: [] }
  );
  return (
    <div
      className={`relative ${
        renderFor === "home" ? "lg:h-dvh" : "lg:h-[calc(100vh/5*3)] mt-5"
      }`}
    >
      {renderFor === "home" && <NavBar />}
      <Swiper
        ref={swiperRef}
        slidesPerView={1}
        spaceBetween={30}
        autoplay={{
          delay: 4000,
        }}
        allowTouchMove={false}
        loop={true}
        modules={[Autoplay, Pagination]}
        className="h-full"
        pagination={{
          clickable: true,
        }}
      >
        {moviesData.map((movie) => (
          <SwiperSlide
            key={movie.id}
            className={`h-full py-20 md:py-12 ${
              renderFor === "home" ? "px-5 xl:px-0" : ""
            }`}
          >
            <Image
              alt={movie.title}
              src={movie.thumbnail_url}
              fill
              priority
              className="object-cover mask-carousel -z-10 h-full w-full"
            />

            {/* movie details */}
            <div
              className={`h-full grid items-center ${
                renderFor === "home" ? "mt-10" : ""
              }`}
            >
              <div
                className={`space-y-2 lg:space-y-3 ${
                  renderFor === "home" ? "container" : ""
                }`}
                id="slide-details"
              >
                <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl">
                  {movie.title}
                </h2>
                <h4 className="text-xl md:text-2xl lg:text-3xl font-semibold">
                  {movie.genre.join(", ")}
                </h4>
                <p className=" text-sm md:text-base text-secondary-foreground max-w-2xl">
                  {isMobile ? truncateText(movie.logline) : movie.logline}
                </p>

                <div className="flex gap-2 items-center md:gap-5 mt-5">
                  <Link href={`/film/${movie.id}`}>
                    <Button
                      className="rounded-full md:px-6"
                      size={isMobile ? "sm" : "default"}
                    >
                      <HugeiconsIcon icon={PlayIcon} />
                      Watch Now
                    </Button>
                  </Link>

                  <TrailerPopup
                    triggerBtn={
                      <Button
                        variant="outline"
                        className="rounded-full! px-4 md:px-6"
                        asChild
                      >
                        <span>Trailer</span>
                      </Button>
                    }
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
