/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  distDir: process.env.CODEX_PREVIEW_DIST_DIR || ".next"
};

export default nextConfig;
