/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/vips',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
