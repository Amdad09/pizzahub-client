import type { NextConfig } from 'next';

const apiServerUrl = process.env.API_SERVER_URL || 'http://localhost:5000/api';

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${apiServerUrl}/:path*`,
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname:  "i.ibb.co",
            },
        ],
    },
};

export default nextConfig;
