import Image from "next/image";
import SearchMovie from "../search-movie";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons/index";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="absolute w-full flex items-center justify-between gap-5 px-14 z-20 mt-5">
      <Image src="/brand-logo.png" height={75} width={120} alt="Brand Logo" />

      {/* Search Bar */}
      <SearchMovie
        leftIcon={<HugeiconsIcon icon={Search01Icon} />}
        placeholder="Search Films"
        className="w-full max-w-md"
      />

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
