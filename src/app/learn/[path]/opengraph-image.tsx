import { ImageResponse } from "next/og";

import { getPath, pathName } from "@/content/paths";
import { OgCard, ogSize } from "@/lib/ogCard";

export const alt = "PythonMates learning path";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ path: string }> }) {
  const path = getPath((await params).path);
  return new ImageResponse(
    <OgCard
      eyebrow={`Free course · ${path?.outline.length ?? 0} lessons`}
      title={path ? pathName(path) : "Python"}
      footer={path?.summary ?? ""}
    />,
    size,
  );
}
