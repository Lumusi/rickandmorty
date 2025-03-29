/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['rickandmortyapi.com'],
  },
  // Disable ESLint during build for Vercel deployment
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript type checking during build
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has TypeScript errors.
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig; 