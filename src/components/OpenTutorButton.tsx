"use client";

import { askTutor } from "@/lib/tutorBus";

export default function OpenTutorButton({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <button type="button" className={className} onClick={() => askTutor()}>
      {children}
    </button>
  );
}
