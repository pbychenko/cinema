/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/**',
      },
    ],
  },
  env: {
    API_KEY: '6e5ea66aa145c5494dd12c5604e4f89a',
  },
}

module.exports = nextConfig
