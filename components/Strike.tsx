import type { ReactNode } from "react";

/**
 * A phrase that gets crossed out. It draws nothing itself: the page line
 * (PageLine.tsx) finds every `[data-strike]` and routes the pen through it,
 * so the phrase is struck when the pen reaches it. Each phrase never wraps,
 * which is what lets the line cross it in one pass.
 */
export default function Strike({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <s data-strike className={`strike ${className}`}>
      {children}
    </s>
  );
}
