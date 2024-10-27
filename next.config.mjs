/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.MODE === 'development' ? undefined : '/vips',
  images: {
    unoptimized: true,
  },
  env: {
    IMAGE_PATH: process.env.MODE === 'development' ? '' : '/vips',
    ISSUE_TOKEN: process.env.ISSUE_TOKEN,
  },
};

export default nextConfig;
