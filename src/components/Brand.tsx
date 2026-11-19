/** Pythonmates mark: an original "prompt" tile — blue square, yellow >_ . */
export function BrandMark({ className = "brand-mark" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#3776AB" />
      <path d="M8.5 10.5 14 16l-5.5 5.5" fill="none" stroke="#FFD43B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.5 22h7" stroke="#FFD43B" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
