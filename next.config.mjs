/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: `/en`
      },
      {
        source: '/:lang/blog/:path*',
        destination: `/blog/:path*`
      }
    ];
  },
  reactStrictMode: false
};

export default nextConfig;
