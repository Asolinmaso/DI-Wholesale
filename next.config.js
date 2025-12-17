/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "di-wholesale-backend.onrender.com",
        pathname: "/uploads/**",
      },
    ],
  },
}

module.exports = nextConfig
