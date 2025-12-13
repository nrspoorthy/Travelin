/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "htmldesigntemplates.com",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com", 
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
      }
    ],
  },
};

export default nextConfig;
