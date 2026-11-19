import type { MetadataRoute } from "next";

import { cheatsheets } from "@/content/cheatsheets";
import { lessonUrl, publishedIn, publishedLessons } from "@/content/lessons";
import { paths } from "@/content/paths";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => `${site.url}${p}`;
  return [
    { url: u("/"), priority: 1 },
    { url: u("/learn/"), priority: 0.9 },
    ...paths
      .filter((p) => publishedIn(p.id).length > 0)
      .map((p) => ({ url: u(`/learn/${p.id}/`), priority: 0.8 })),
    ...publishedLessons().map((l) => ({ url: u(lessonUrl(l)), lastModified: new Date(l.updated), priority: 0.7 })),
    { url: u("/guides/learn-python-with-ai/"), priority: 0.8 },
    { url: u("/cheat-sheets/"), priority: 0.7 },
    ...cheatsheets.map((c) => ({ url: u(`/cheat-sheets/${c.slug}/`), lastModified: new Date(c.updated), priority: 0.7 })),
    { url: u("/practice/"), priority: 0.6 },
    { url: u("/about/"), priority: 0.4 },
  ];
}
