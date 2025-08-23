import Image from "next/image";
import SearchMovie from "./search-movie";
import { Button } from "../ui/button";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";

export default function NavBar({ renderFor }) {
  const isMobile = useIsMobile();
  return (
    <div
      className={`flex items-center justify-between gap-2 md:gap-5 absolute w-full top-2 z-20 left-1/2 -translate-x-1/2 ${
        renderFor === "home" ? "px-5 xl:px-0 container" : "px-3"
      } `}
    >
      <Link href="/">
        <Image src="/brand-logo.png" height={75} width={120} alt="Brand Logo" />
      </Link>

      {/* Search Bar */}
      <SearchMovie className="w-full max-w-xl" />

      {/* Auth Buttons */}
      <div className="flex gap-3">
        <Link href="/signin" className="hidden md:block">
          <Button variant="secondary">Sign In</Button>
        </Link>
        <Link href="/signup">
          <Button size={isMobile ? "sm" : "default"}>Sign Up</Button>
        </Link>
      </div>
    </div>
  );
}
