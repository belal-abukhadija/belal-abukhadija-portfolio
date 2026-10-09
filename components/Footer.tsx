import Link from "next/link";
import { personalInfo } from "@/lib/projects-data";
import { navItems } from "./Header";

/**
 * `signature` leaves room above the footer row for the page line to sign
 * "Belal" (PageLine.tsx fills it). Only the home page has the line.
 */
export default function Footer({ signature = false }: { signature?: boolean }) {
  return (
    <footer id="footer" className="on-ink gutter bg-ink text-paper pb-10">
      {signature && (
        <div data-pen-signature aria-hidden="true" className="h-[clamp(9rem,20vw,18rem)] mb-10" />
      )}
      <div className="border-t-2 border-paper pt-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 font-medium">
        <p>
          © {new Date().getFullYear()} {personalInfo.name}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link href={`/#${item.id}`} className="hover:underline decoration-mark">
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <a href="#top" className="hover:underline decoration-mark">
              Back to top
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
