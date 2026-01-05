/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/ws-chat/:path*",
        destination: "https://joy-untrellised-bullheadedly.ngrok-free.dev/ws-chat/:path*",
      },
      {
        source: "/api/chat/:path*",
        destination: "https://joy-untrellised-bullheadedly.ngrok-free.dev/:path*",
      },
    ];
  },
  images: {
    // ⚠ 기존 domains 설정 (Next.js에서 권장하지 않음)
    // domains: ["storage.googleapis.com", "localhost"],

    // ✅ 최신 remotePatterns 설정 (보안 강화 및 경고 해결)
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
        port: '', // 특정 포트(예: '3000')가 있다면 기입, 없다면 비워둠
        pathname: '/**',
      },
      // ngrok 도메인을 사용하는 경우 아래 패턴을 추가하면 편리합니다.
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