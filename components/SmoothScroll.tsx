"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { scrollPace } from "@/lib/scroll-pace";

// Lenis already stops short by the page's scroll-padding-top (5rem, there for
// native jumps). Sections bring their own generous top padding, so give that
// back and land with the section's top edge at the top of the screen.
const SECTION_OFFSET = 80;

/**
 * Eased, inertial wheel scrolling for the whole site (Lenis), plus smooth
 * jumps for same-page section links. Renders nothing. Touch scrolling is left
 * native, and visitors who ask for reduced motion get plain scrolling.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      // While the page line's pen is finishing a sideways stroke, let less of
      // each downward wheel movement through, so the page waits for it.
      // Scrolling back up is never held.
      virtualScroll: (data) => {
        if (data.deltaY > 0) data.deltaY *= scrollPace.factor;
        return true;
      },
    });

    // Section links are written as "/#about" so they also work from article
    // pages. On the page they point at, glide there instead of jumping. This
    // runs in the capture phase and cancels the click so next/link stands down.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement) || link.target === "_blank") return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;

      e.preventDefault();
      history.pushState(null, "", url.hash);
      if (target === document.documentElement) lenis.scrollTo(0);
      else lenis.scrollTo(target, { offset: SECTION_OFFSET });
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      lenis.destroy();
    };
  }, []);

  return null;
}
