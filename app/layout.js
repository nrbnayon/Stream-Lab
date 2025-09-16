import { Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "@/redux/provider/Providers";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "Stream Lab | Watch Movies Online & Create AI-Generated Films",
  description:
    "Stream Lab lets you watch movies online anytime, anywhere. Create your own AI-generated movie studio, share your creations, and earn money from your films.",
  keywords: [
    "Stream Lab",
    "watch movies online",
    "AI movie generator",
    "create movies with AI",
    "online movie streaming",
    "earn money with movies",
    "movie studio platform",
  ],
  authors: [{ name: "Nayon Kanti Halder" }],
  creator: "Stream Lab",
  publisher: "Stream Lab",
  openGraph: {
    title: "Stream Lab | Watch Movies Online & Create AI-Generated Films",
    description:
      "Stream movies online and create your own AI-powered movie studio. Share, publish, and monetize your films with Stream Lab.",
    url: "https://stream-lab-one.vercel.app",
    siteName: "Stream Lab",
    images: [
      {
        url: "https://i.ibb.co.com/1Y09C1SN/brand-logo.png",
        width: 1200,
        height: 630,
        alt: "Stream Lab - Watch Movies Online & AI Movie Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stream Lab | Watch Movies Online & Create AI-Generated Films",
    description:
      "Watch movies online and create your own AI-powered studio with Stream Lab. Publish and earn from your films.",
    images: ["https://i.ibb.co.com/1Y09C1SN/brand-logo.png"],
    creator: "@nrbnayon",
  },
  metadataBase: new URL("https://stream-lab-one.vercel.app"),
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
  alternates: {
    canonical: "https://stream-lab-one.vercel.app",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="antialiased">
        <main className={`${roboto.variable} ${geistMono.variable}`}>
        <Providers>
          {children}
          <Toaster richColors closeButton />
          </Providers>
        </main>
      </body>
    </html>
  );
}
