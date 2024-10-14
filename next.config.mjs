/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/vips',
  images: {
    unoptimized: true,
  },
  env: {
    IMAGE_PATH: process.env.MODE === 'development' ? '/vips' : '',
  },
};

export default nextConfig;
