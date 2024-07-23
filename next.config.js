/** @type {import('next').NextConfig} */

const backendUrl = new URL(String(process.env.NEXT_PUBLIC_BACKEND_URL))

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: backendUrl.protocol.substr(0, backendUrl.protocol.length - 1),
        hostname: backendUrl.hostname,
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
