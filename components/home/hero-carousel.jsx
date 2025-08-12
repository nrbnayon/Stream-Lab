"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// custom CSS
import "../../styles/swiper-carousel.css";
import Image from "next/image";
import { Button } from "../ui/button";
import BtnWithLeftIcon from "../btn-with-left-icon";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlayIcon } from "@hugeicons/core-free-icons/index";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import NavBar from "./nav-bar";

export default function HeroCarousel({ moviesData }) {
  const swiperRef = useRef(null);

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
    <div className="relative">
      <NavBar />
      <Swiper
        ref={swiperRef}
        slidesPerView={1}
        spaceBetween={30}
        autoplay={{
          delay: 4000,
          pauseOnMouseEnter: true,
        }}
        allowTouchMove={false}
        loop={true}
        modules={[Autoplay, Pagination]}
        pagination={{
          el: "#custom-pagination",
          clickable: true,
          renderBullet: (index, className) => {
            const movie = moviesData[index];
            return `
              <div class="${className} cursor-pointer rounded-md overflow-hidden" style="width: 7rem; aspect-ratio: 3 / 4;">
                <img
                  src="${movie.thumbnail_url}"
                  alt="${movie.title}"
                  class="w-full h-full object-cover"
                />
              </div>
            `;
          },
        }}
      >
        {moviesData.map((movie) => (
          <SwiperSlide
            key={movie.id}
            className="h-full py-32 px-14 bg-cover bg-center"
          >
            <Image
              alt={movie.title}
              src={movie.thumbnail_url}
              fill
              priority
              className="object-cover mask-carousel -z-10"
            />

            {/* movie details */}
            <div className="space-y-2 w-full max-w-2xl" id="slide-details">
              <h2 className="font-bold text-5xl">{movie.title}</h2>
              <h4 className="text-3xl font-semibold">
                {movie.genre.join(", ")}
              </h4>
              <p className="text-secondary-foreground">{movie.logline}</p>

              <div className="flex gap-5 mt-6">
                <BtnWithLeftIcon
                  text="Watch Now"
                  className="rounded-full px-6"
                  icon={<HugeiconsIcon icon={PlayIcon} size={25} />}
                />
                <Button className="rounded-full px-8" variant="outline">
                  Trailer
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Container */}
      <div
        className="flex gap-2 items-center -mt-8 mx-14"
        id="custom-pagination"
      ></div>
    </div>
  );
}
