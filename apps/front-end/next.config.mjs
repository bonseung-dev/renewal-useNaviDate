/** @type {import('next').NextConfig} */
const nextConfig = {
  // 모노레포 구조에서 정적 파일 경로 설정
  experimental: {
    outputFileTracingRoot: undefined,
  },
  images: {
    domains: [
      'encrypted-tbn0.gstatic.com',
      'cdn.pixabay.com',
      'lh3.googleusercontent.com',
      'localhost',
      'usenavi-api.sorune.org'
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
          },
        ],
      },
    ];
  },
  // 모노레포에서 타입스크립트 경로 해결
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
