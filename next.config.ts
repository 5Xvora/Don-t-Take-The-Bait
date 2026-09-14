import type { NextConfig } from 'next';
import dotenv from 'dotenv';

// Load .env into process.env (dotenv.populate is used internally to inject)
dotenv.config({ path: '.env', override: true });

const nextConfig: NextConfig = {
  output: 'export',          // <--- أضفنا هذا السطر عشان يتحول لملفات ثابتة (HTML/JS)
  reactStrictMode: false,
  turbopack: {},
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    PROJECT_ID: process.env.HAPPYSEEDS_PROJECT_ID ?? '',
    REACTUS_BASE_URL: process.env.REACTUS_BASE_URL ?? '',
  },
  serverExternalPackages: [],
  allowedDevOrigins: [
    '**.*.*',
  ],
  images: {
    unoptimized: true,       // <--- وأضفنا هذا السطر عشان الصور ما تتعطل على جيت هب
  },
};

export default nextConfig;