/** PythonMates mark: two mates — a blue P tile and a yellow M tile, overlapping. */
export function BrandMark({ className = "brand-mark" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <rect x="1.5" y="1.5" width="19.5" height="19.5" rx="5.5" fill="#3776ab" />
      <rect x="11" y="11" width="19.5" height="19.5" rx="5.5" fill="#ffd43b" />
      <path
        d="M6.6 16.2V6.6h3.9a3.1 3.1 0 0 1 0 6.2H6.6"
        fill="none"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.4 25.6v-8.4l4.35 5.4 4.35-5.4v8.4"
        fill="none"
        stroke="#11284a"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
