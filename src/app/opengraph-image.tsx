import { ImageResponse } from "next/og";

import { publishedLessons } from "@/content/lessons";
import { OgCard, ogSize } from "@/lib/ogCard";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <OgCard
      eyebrow={`Free · Python ${site.pythonVersion} · runs in your browser`}
      title="Learn Python the modern way"
      footer={`${publishedLessons().length} free lessons, from your first line of code to Python for AI · pythonmates.com`}
    />,
    size,
  );
}
