import { BrainCircuit, Code2, Rocket, Sprout } from "lucide-react";

import type { PathId } from "@/content/types";

export const pathIcons: Record<PathId, React.ReactNode> = {
  beginner: <Sprout size={22} />,
  intermediate: <Code2 size={22} />,
  advanced: <Rocket size={22} />,
  ai: <BrainCircuit size={22} />,
};
