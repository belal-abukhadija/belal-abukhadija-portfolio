"use client";

import { useEffect, useRef } from "react";

interface Props {
  src: string;
  /** Crossfade length in seconds (auto-clamped to half the clip length). */
  fade?: number;
  className?: string;
}

/**
 * Seamless looping background video. Renders two stacked copies of the same
 * clip and crossfades them near each loop seam so the restart cut is never
 * visible. The second copy starts half a clip-length later (a delayed start,
 * NOT a seek) so it plays forward from 0 like the first — this avoids seeking
 * into not-yet-buffered video, which on a cold cache stalls and flashes the
 * first frame (the "restart on first load" glitch). Client-only, both muted.
 * Trade-off: two copies decode at once (fine for a light background clip).
 */
export default function LoopBackgroundVideo({ src, fade = 1, className = "" }: Props) {
  const aRef = useRef<HTMLVideoElement>(null);
  const bRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b) return;
    let raf = 0;
    let delayTimer = 0;
    let cancelled = false;

    // Each copy fades to 0 around its own restart and sits at 1 the rest of the
    // time; the half-clip start offset means the other copy always covers the seam.
    const opacityFor = (v: HTMLVideoElement) => {
      const d = v.duration;
      if (!d || Number.isNaN(d)) return 0;
      const f = Math.min(fade, d / 2);
      const t = v.currentTime;
      if (t < f) return t / f;
      if (t > d - f) return (d - t) / f;
      return 1;
    };

    const tick = () => {
      a.style.opacity = String(opacityFor(a));
      b.style.opacity = String(opacityFor(b));
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      const d = a.duration;
      if (!d || Number.isNaN(d) || cancelled) return;
      // Both play forward from 0 — no seeking, so nothing stalls on cold load.
      a.play().catch(() => {});
      delayTimer = window.setTimeout(() => {
        if (!cancelled) b.play().catch(() => {});
      }, (d / 2) * 1000);
      raf = requestAnimationFrame(tick);
    };

    if (a.readyState >= 1) start();
    else a.addEventListener("loadedmetadata", start, { once: true });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(delayTimer);
      a.removeEventListener("loadedmetadata", start);
    };
  }, [src, fade]);

  const layer = `absolute inset-0 w-full h-full object-cover ${className}`.trim();
  const shared = {
    muted: true,
    loop: true,
    playsInline: true,
    preload: "auto" as const,
    "aria-hidden": true,
    suppressHydrationWarning: true,
  };

  return (
    <>
      <video ref={aRef} className={layer} style={{ opacity: 0 }} {...shared}>
        <source src={src} type="video/mp4" />
      </video>
      <video ref={bRef} className={layer} style={{ opacity: 0 }} {...shared}>
        <source src={src} type="video/mp4" />
      </video>
    </>
  );
}
