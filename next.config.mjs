/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['scontent-hou1-1.cdninstagram.com'],
  },
  experimental: {
    allowedDevOrigins: ["localhost", "localhost:3000", "10.254.207.208", "10.254.207.208:3000", "192.168.143.208", "192.168.143.208:3000"],
  },
};

export default nextConfig;
