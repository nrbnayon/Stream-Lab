/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Option 1: Allow all external images (least secure but most flexible)
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all HTTPS domains
      },
      {
        protocol: "http",
        hostname: "**", // Allow all HTTP domains (for local development)
      },
    ],

    // Option 2: More specific but still flexible approach
    // remotePatterns: [
    //    {
    //       hostname: "i.pinimg.com",
    //       protocol: "https",
    //    },
    //    {
    //       hostname: "10.10.12.11", // Your backend server
    //       protocol: "http",
    //       port: "8000"
    //    },
    //    {
    //       protocol: 'https',
    //       hostname: '*.amazonaws.com', // AWS S3
    //    },
    //    {
    //       protocol: 'https',
    //       hostname: '*.cloudinary.com', // Cloudinary
    //    }
    // ]

    // Option 3: Disable image optimization completely (allows any source)
    // unoptimized: true,
    // loader: 'custom',
    // loaderFile: './image-loader.js'
  },
};

export default nextConfig;
