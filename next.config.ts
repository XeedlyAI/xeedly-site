import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // ---------------------------------------------------------------
      // Legacy Webflow URLs → current site
      // The old Webflow site exposed 4 feature pages from its homepage:
      // /communicate, /payments, /pricing, /reviews. Of those, only
      // /pricing has a direct equivalent on the new site (same URL, no
      // redirect needed). The other three are gone as standalone
      // products; we route them to the closest topical match instead
      // of letting them 404 or soft-404 into the homepage.
      // ---------------------------------------------------------------
      {
        source: "/communicate",
        destination: "/platform",
        permanent: true,
      },
      {
        source: "/payments",
        destination: "/platform",
        permanent: true,
      },
      {
        source: "/reviews",
        destination: "/pricing",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
