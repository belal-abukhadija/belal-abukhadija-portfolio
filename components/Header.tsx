import Link from "next/link";
import { personalInfo } from "@/lib/projects-data";

// Section ids are shared with Footer.tsx; keep the two lists in sync.
export const navItems = [
  { label: "About", id: "about" },
  { label: "Work", id: "work" },
  { label: "Writing", id: "articles" },
  { label: "Contact", id: "contact" },
];

export default function Header() {
  return (
    <header className="gutter fixed top-0 inset-x-0 z-50 bg-paper">
      <nav className="flex items-center justify-between gap-4 py-4" aria-label="Main">
        <Link href="/#hero" className="font-extrabold tracking-tight hover:underline decoration-mark">
          {personalInfo.domain}
        </Link>
        <ul className="flex items-center gap-4 sm:gap-8 text-[0.95rem] font-medium">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link href={`/#${item.id}`} className="hover:underline decoration-mark">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
