/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode
  reactStrictMode: true,
  
  // Optimize images
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Turbopack configuration with root to fix workspace warning
  turbopack: {
    root: __dirname,
  },
  
  // Disable source maps in production
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
