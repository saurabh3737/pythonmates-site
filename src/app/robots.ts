import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

// Open to search engines and AI assistants alike: being cited by them is the goal.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
