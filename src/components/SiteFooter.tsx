import Link from "next/link";

import { BrandMark } from "@/components/Brand";
import { paths } from "@/content/paths";
import { site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link href="/" className="brand">
              <BrandMark />
              <span>
                Python<b>Mates</b>
              </span>
            </Link>
            <p>
              Free, modern Python tutorials with code you run in the browser. Lessons tested on Python{" "}
              {site.pythonVersion}.
            </p>
          </div>
          <div>
            <h3>Learn</h3>
            <ul>
              {paths.map((p) => (
                <li key={p.id}>
                  <Link href={`/learn/${p.id}/`}>{p.title}</Link>
                </li>
              ))}
              <li>
                <Link href="/practice/">Practice</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>About</h3>
            <ul>
              <li>
                <Link href="/about/">About PythonMates</Link>
              </li>
              <li>
                <a href={site.author.url}>{site.author.name}</a>
              </li>
              <li>
                <a href={site.author.book} rel="noopener">
                  AI for Real Work (book)
                </a>
              </li>
              <li>
                <a href="/llms.txt">llms.txt</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="family">
          <span>
            Part of the <strong>mates</strong> family:
          </span>
          <a href={site.aimates} rel="noopener">
            AIMates — learn and use AI at work
          </a>
          <span>PythonMates — learn Python</span>
          <span>© {new Date().getFullYear()} {site.author.name}</span>
        </div>
      </div>
    </footer>
  );
}
