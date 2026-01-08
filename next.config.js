/** @type {import('next').NextConfig} */
// Force reload

const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ });

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: { unoptimized: true },
};

module.exports = withMDX(nextConfig);
