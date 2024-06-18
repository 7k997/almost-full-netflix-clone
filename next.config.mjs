/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "assets.nflxext.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "occ-0-1489-2774.1.nflxso.net",
        pathname: "**",
      },
    ],
  }
};

export default nextConfig;
