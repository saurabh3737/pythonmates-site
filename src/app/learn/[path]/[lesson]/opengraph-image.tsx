import { ImageResponse } from "next/og";

import { getLesson } from "@/content/lessons";
import { getPath } from "@/content/paths";
import { OgCard, ogSize } from "@/lib/ogCard";
import { site } from "@/lib/site";

export const alt = "PythonMates Python lesson";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ path: string; lesson: string }> }) {
  const { path: pathId, lesson: slug } = await params;
  const lesson = getLesson(pathId, slug);
  const path = getPath(pathId);
  return new ImageResponse(
    <OgCard
      eyebrow={`${path?.title ?? "Python"} path · ${lesson?.minutes ?? 10} min lesson`}
      title={lesson?.title ?? site.tagline}
      footer={`Runnable code · exercise · quiz · tested on Python ${site.pythonVersion}`}
    />,
    size,
  );
}
