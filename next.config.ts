import { existsSync } from "node:fs";
import path from "node:path";

import type { NextConfig } from "next";

// Old Sphinx URLs (pythonmates.com/<page>.html, and saurabhjaiswal.com/pythonmates/<page>.html
// which already 301s here) → their new lessons. Keeps Google rankings and backlinks.
const legacy: Record<string, string> = {
  "index.html": "/",
  "intpy.html": "/learn/beginner/what-is-python/",
  "editor.html": "/learn/",
  "datatypes.html": "/learn/beginner/",
  "condition.html": "/learn/beginner/conditions/",
  "loops.html": "/learn/beginner/loops/",
  "functions.html": "/learn/beginner/functions/",
  "utilities.html": "/learn/intermediate/functional-tools/",
  "class.html": "/learn/intermediate/classes/",
  "modpack.html": "/learn/intermediate/modules-and-packages/",
  "iterator.html": "/learn/intermediate/iterators-and-generators/",
  "decorator.html": "/learn/intermediate/decorators/",
  "parallel.html": "/learn/advanced/concurrency-vs-parallelism/",
  "multithreading.html": "/learn/advanced/threads/",
  "multiprocessing.html": "/learn/advanced/multiprocessing/",
  "socket.html": "/learn/advanced/sockets/",
  "cases.html": "/learn/advanced/speed-up-api-calls/",
  "examples.html": "/practice/",
  "pygames.html": "/learn/intermediate/pygame-game/",
  "genindex.html": "/learn/",
  "search.html": "/learn/",
};

// A lesson URL /learn/<path>/<slug>/ is live when its lesson file exists.
function isLive(url: string): boolean {
  const m = url.match(/^\/learn\/([^/]+)\/([^/]+)\/$/);
  if (!m) return true;
  return existsSync(path.join(process.cwd(), "src/content/lessons", m[1], `${m[2]}.ts`));
}

const nextConfig: NextConfig = {
  trailingSlash: true,

  async redirects() {
    return [
      ...Object.entries(legacy).map(([from, to]) => {
        const ready = isLive(to);
        return {
          source: `/${from}`,
          // Until a lesson is written, send visitors to its path page with a
          // temporary redirect; it becomes a permanent 301 once the lesson file exists.
          destination: ready ? to : to.split("/").slice(0, 3).join("/") + "/",
          permanent: ready,
        };
      }),
      { source: "/_sources/:path*", destination: "/learn/", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
        ],
      },
    ];
  },
};

export default nextConfig;
