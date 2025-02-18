const { withContentlayer } = require("next-contentlayer2");
const { withPlausibleProxy } = require("next-plausible");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    scrollRestoration: false,
  },
};

module.exports = withPlausibleProxy()(withContentlayer(nextConfig));
