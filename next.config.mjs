/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  productionBrowserSourceMaps: true, // ✅ enable better debugging
  output: 'standalone', // (optional, good for serverless deploys too)
  experimental: {
    instrumentationHook: true, // (optional, helps debugging backend routes)
  },
}

export default nextConfig
