/** @type {import('next').NextConfig} */

const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ });

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: { unoptimized: true },
};

module.exports = withMDX(nextConfig);
