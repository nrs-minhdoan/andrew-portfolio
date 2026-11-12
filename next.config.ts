import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const isDev = process.env.NODE_ENV === "development";

// CSP. `unsafe-inline` for styles is required by Tailwind/Next runtime CSS.
// `unsafe-eval` for scripts is dev-only (HMR + React Refresh).
// NOTE: production script-src still allows `unsafe-inline` because the pages
// are statically generated and Next emits inline bootstrap scripts without a
// nonce. There is no nonce/hash protection, so never add user-controlled
// content to inline scripts or raw HTML sinks.
const ContentSecurityPolicy = [
  `default-src 'self'`,
  `base-uri 'self'`,
  `form-action 'self'`,
  `frame-ancestors 'none'`,
  `object-src 'none'`,
  `img-src 'self' data: blob: https://cdn.jsdelivr.net https://cdn.simpleicons.org https://www.google.com`,
  `font-src 'self' data: https://fonts.gstatic.com`,
  `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
  `script-src 'self' https://static.cloudflareinsights.com ${isDev ? "'unsafe-eval' 'unsafe-inline'" : "'unsafe-inline'"}`,
  `connect-src 'self' https://cloudflareinsights.com ${isDev ? "ws: wss:" : ""}`.trim(),
  `manifest-src 'self'`,
  `worker-src 'self' blob:`,
  `upgrade-insecure-requests`,
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: ContentSecurityPolicy },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value:
      "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "Origin-Agent-Cluster", value: "?1" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Stop `next dev` from generating AGENTS.md in the repo root.
  agentRules: false,
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    // No remotePatterns: remote icons are plain <img> tags loaded by the
    // browser, and next/image only optimizes local files. Allowing remote
    // hosts would let anyone use /_next/image to fetch arbitrary URLs on them.
    formats: ["image/avif", "image/webp"],
    contentDispositionType: "attachment",
    dangerouslyAllowSVG: false,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
