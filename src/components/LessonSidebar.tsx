import Link from "next/link";

import { isPublished, lessonUrl } from "@/content/lessons";
import type { PathInfo } from "@/content/types";

export default function LessonSidebar({ path, current }: { path: PathInfo; current: string }) {
  return (
    <nav className="sidebar" aria-label={`${path.title} lessons`}>
      <h2>
        <Link href={`/learn/${path.id}/`}>{path.title} path</Link>
      </h2>
      <ol>
        {path.outline.map((o, i) => (
          <li key={o.slug}>
            {isPublished(path.id, o.slug) ? (
              <Link
                href={lessonUrl({ path: path.id, slug: o.slug })}
                aria-current={o.slug === current ? "page" : undefined}
              >
                {i + 1}. {o.title}
              </Link>
            ) : (
              <span>
                {i + 1}. {o.title}
                <small>soon</small>
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
