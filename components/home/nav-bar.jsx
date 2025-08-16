import Image from "next/image";
import SearchMovie from "./search-movie";
import { Button } from "../ui/button";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="absolute w-full flex items-center justify-between gap-5 z-20 mt-5 container left-1/2 -translate-x-1/2">
      <Image src="/brand-logo.png" height={75} width={120} alt="Brand Logo" />

      {/* Search Bar */}
      <SearchMovie className="w-full max-w-xl" />

      {/* Auth Buttons */}
      <div className="flex gap-3">
        <Link href="/signin">
          <Button variant="secondary">Sign In</Button>
        </Link>
        <Link href="/signup">
          <Button>Sign Up</Button>
        </Link>
      </div>
    </div>
  );
}
