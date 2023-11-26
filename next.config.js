/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist',
  images: {
    remotePatterns: [
      {
        hostname: 'i.dummyjson.com',
      }
    ]
  }
}

export default nextConfig;
