import localFont from "next/font/local";
export const FoundersGrotesk = localFont({
   src: [
      {
         path: "./fonts/FoundersGrotesk-Light.otf",
         style: "normal",
         weight: "300"
      },
      {
         path: "./fonts/FoundersGrotesk-Regular.otf",
         style: "normal",
         weight: "400"
      },
      {
         path: "./fonts/FoundersGrotesk-Medium.otf",
         style: "normal",
         weight: "500"
      },
      {
         path: "./fonts/FoundersGrotesk-Semibold.otf",
         style: "normal",
         weight: "600"
      },
   ],
   display: "swap",
   variable: "--font-founders-grotesk"
})