/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        // 1. 웹소켓용 (기존 유지)
        source: "/ws-chat/:path*",
        destination: "https://joy-untrellised-bullheadedly.ngrok-free.dev/ws-chat/:path*",
      },
      {
        // 2. 일반 API용 (수정됨: destination에 /chat 추가)
        // 프론트에서 /api/chat-proxy/rooms 호출 -> 백엔드 /chat/rooms 로 전달
        source: "/api/chat-proxy/:path*",
        destination: "https://joy-untrellised-bullheadedly.ngrok-free.dev/chat/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
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
        protocol: 'https',
        hostname: '**.ngrok-free.app',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;