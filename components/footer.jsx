import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-secondary">
      <div className="container py-8 md:py-12">
        <Image
          src="/brand-logo.png"
          alt="Brand Logo"
          height={50}
          width={100}
          className="mx-auto w-auto h-auto"
        />
        <ul className="mt-5 flex gap-3 justify-center">
          <li>
            <Link className="hover:underline" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="hover:underline" href="/#trending-movie">
              Trending Movie
            </Link>
          </li>
          <li>
            <Link className="hover:underline" href="/#latest-drama">
              Latest Drama
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
