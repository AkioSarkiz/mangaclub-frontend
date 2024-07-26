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
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
