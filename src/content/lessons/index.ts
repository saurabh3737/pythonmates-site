import { paths } from "@/content/paths";
import type { Lesson, PathId } from "@/content/types";

import conditions from "./beginner/conditions";
import dictionaries from "./beginner/dictionaries";
import filesAndErrors from "./beginner/files-and-errors";
import firstProgram from "./beginner/first-program";
import functions from "./beginner/functions";
import lists from "./beginner/lists";
import loops from "./beginner/loops";
import numbers from "./beginner/numbers";
import strings from "./beginner/strings";
import tuplesAndSets from "./beginner/tuples-and-sets";
import variables from "./beginner/variables";
import whatIsPython from "./beginner/what-is-python";

// Add each new lesson file here. Order on the site comes from paths.ts.
const all: Lesson[] = [
  // Beginner
  whatIsPython,
  firstProgram,
  variables,
  numbers,
  strings,
  lists,
  tuplesAndSets,
  dictionaries,
  conditions,
  loops,
  functions,
  filesAndErrors,
];

const byKey = new Map(all.map((l) => [`${l.path}/${l.slug}`, l]));

export function getLesson(path: string, slug: string): Lesson | undefined {
  return byKey.get(`${path}/${slug}`);
}

export function isPublished(path: PathId, slug: string): boolean {
  return byKey.has(`${path}/${slug}`);
}

/** Published lessons in curriculum order. */
export function publishedLessons(): Lesson[] {
  return paths.flatMap((p) => p.outline.map((o) => getLesson(p.id, o.slug)).filter((l): l is Lesson => !!l));
}

export function publishedIn(path: PathId): Lesson[] {
  return publishedLessons().filter((l) => l.path === path);
}

export function neighbours(lesson: Lesson): { prev?: Lesson; next?: Lesson } {
  const list = publishedLessons();
  const i = list.findIndex((l) => l.path === lesson.path && l.slug === lesson.slug);
  return { prev: list[i - 1], next: list[i + 1] };
}

export function lessonUrl(l: { path: string; slug: string }): string {
  return `/learn/${l.path}/${l.slug}/`;
}
