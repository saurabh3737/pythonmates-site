import Link from "next/link";

import { BrandMark } from "@/components/Brand";
import ThemeToggle from "@/components/ThemeToggle";
import { nav } from "@/lib/site";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="brand" aria-label="Pythonmates home">
          <BrandMark />
          <span>
            Python<b>mates</b>
          </span>
        </Link>
        <nav className="site-nav" aria-label="Main">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/learn/beginner/what-is-python/" className="btn btn-primary btn-sm">
            Start free
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
