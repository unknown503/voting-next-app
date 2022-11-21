/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xsgames.co',
        pathname: '/randomusers/**',
      },
    ]
  }
}

module.exports = nextConfig
