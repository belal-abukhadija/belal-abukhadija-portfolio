"use client";

import { useEffect, useRef } from "react";
import type { Pen } from "@/lib/pen3d";
import { scrollPace } from "@/lib/scroll-pace";

type Pt = [number, number];
interface Box {
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
}
/** One line of struck text: the span to cross out and the height to do it at. */
interface Row {
  x1: number;
  x2: number;
  y: number;
  h: number;
}

// The 3D pen at full size is about 200px long, and its cap travels a little
// past either end. It is drawn in a square canvas with the nib at the centre,
// so the canvas has to hold all of that in every direction.
const PEN_LENGTH = 200;
const PEN_REACH = 2.6;
// The pen's own pace on a sideways stroke, in px of line per frame at 60fps
// (about 1000px a second). On vertical stretches it simply follows the scroll.
const PEN_SPEED = 17;
// Once the pen is this far behind (px of line), downward scrolling starts to
// ease off, down to SLOWEST of its normal speed, until the pen has caught up.
const WAIT_FROM = 120;
const WAIT_OVER = 600;
const SLOWEST = 0.1;
// Further behind than this means the visitor jumped (a nav link, the
// scrollbar), not scrolled: stop pacing and catch up fast.
const JUMPED = 3500;

/** The line as geometry: its SVG path, and the same curve as a measured polyline. */
interface Route {
  d: string;
  /** Points along the curve, and the distance travelled to reach each one. */
  xs: number[];
  ys: number[];
  at: number[];
  total: number;
}

// How many straight pieces each curve between two waypoints is measured in.
const PIECES = 20;

/**
 * Smooth curve through every point (Catmull-Rom converted to cubic Beziers).
 * Where a tangent would push a control point outside minX..maxX it is
 * shortened, on both sides of the point alike, so the curve cannot bulge off
 * the page at a turn (a Bezier stays inside the hull of its control points)
 * and still passes through the point without a kink. Points listed in
 * `corners` are the exception: the curve stops dead there and sets off in a
 * new direction, which is how the arrowhead gets its sharp tip and barbs.
 *
 * The curve is also walked here and returned as a measured polyline, so that
 * finding a point a given distance along the line is arithmetic. Asking the
 * browser instead (SVGPathElement.getPointAtLength) costs most of a
 * millisecond per call on a path this long, and the route needs thousands of
 * them: that froze the page for over two seconds on every rebuild.
 */
function route(points: Pt[], minX: number, maxX: number, corners: Set<number>): Route {
  const tangents = points.map((p, i): Pt => {
    if (corners.has(i)) return [0, 0];
    const prev = points[Math.max(i - 1, 0)];
    const next = points[Math.min(i + 1, points.length - 1)];
    const t: Pt = [(next[0] - prev[0]) / 6, (next[1] - prev[1]) / 6];
    const room = Math.max(0, Math.min(p[0] - minX, maxX - p[0]));
    const k = Math.abs(t[0]) > room ? room / Math.abs(t[0]) : 1;
    return [t[0] * k, t[1] * k];
  });

  let d = `M${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;
  const xs = [points[0][0]];
  const ys = [points[0][1]];
  const at = [0];
  let total = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const [p1, p2, t1, t2] = [points[i], points[i + 1], tangents[i], tangents[i + 1]];
    const [ax, ay, bx, by] = [p1[0] + t1[0], p1[1] + t1[1], p2[0] - t2[0], p2[1] - t2[1]];
    d += ` C${ax.toFixed(1)} ${ay.toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
    for (let k = 1; k <= PIECES; k++) {
      const t = k / PIECES;
      const u = 1 - t;
      const x = u * u * u * p1[0] + 3 * u * u * t * ax + 3 * u * t * t * bx + t * t * t * p2[0];
      const y = u * u * u * p1[1] + 3 * u * u * t * ay + 3 * u * t * t * by + t * t * t * p2[1];
      total += Math.hypot(x - xs[xs.length - 1], y - ys[ys.length - 1]);
      xs.push(x);
      ys.push(y);
      at.push(total);
    }
  }
  return { d, xs, ys, at, total };
}

/** A pen loop: once round a circle, entering and leaving at the top. */
function loop(cx: number, cy: number, r: number): Pt[] {
  return [-90, -20, 50, 120, 190, 250].map((deg) => {
    const a = (deg * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a) * 0.8];
  });
}

/**
 * "Belal" as one unbroken stroke of joined handwriting. Each letter is a list
 * of points in letter units (x to the right, y up from the baseline, x-height
 * about 1, ascenders about 2.2) followed by how far to advance for the next
 * letter. Every letter starts where the previous one ended.
 */
const SIGNATURE: { points: Pt[]; advance: number }[] = [
  {
    // B: down the stem, back up it, two bowls, a small hook, out to the right
    points: [[0.18, 2.15], [0.14, 1.1], [0.1, 0.02], [0.2, 1.1], [0.24, 2.1], [0.75, 2.05], [0.98, 1.65], [0.7, 1.22], [0.3, 1.12], [0.85, 1.02], [1.12, 0.58], [0.82, 0.1], [0.42, 0.12], [0.3, 0.32], [0.52, 0.42], [0.95, 0.2], [1.4, 0.12]],
    advance: 1.4,
  },
  { points: [[0.38, 0.55], [0.47, 0.88], [0.3, 1.02], [0.12, 0.7], [0.2, 0.2], [0.45, 0.03], [0.75, 0.14]], advance: 0.75 }, // e
  { points: [[0.38, 1.1], [0.5, 1.9], [0.4, 2.2], [0.26, 1.9], [0.24, 0.5], [0.38, 0.06], [0.7, 0.14]], advance: 0.7 }, // l
  { points: [[0.25, 0.75], [0.5, 1.02], [0.72, 0.88], [0.45, 1.0], [0.14, 0.62], [0.32, 0.08], [0.62, 0.3], [0.75, 0.88], [0.77, 0.3], [0.92, 0.05], [1.2, 0.14]], advance: 1.2 }, // a
  { points: [[0.38, 1.1], [0.5, 1.9], [0.4, 2.2], [0.26, 1.9], [0.24, 0.5], [0.38, 0.06], [0.75, 0.16], [1.5, 0.42]], advance: 1.5 }, // l, and a tail
];
const SIGNATURE_WIDTH = SIGNATURE.reduce((sum, letter) => sum + letter.advance, 0);

/**
 * One continuous red pen line from the top of the page to the bottom, drawn
 * as the visitor scrolls, with a 3D marker pen (lib/pen3d.ts, three.js,
 * loaded lazily) riding its end so the pen appears to draw it.
 *
 * The line is what crosses out the text: it is routed through every
 * `[data-strike]` phrase (see Strike.tsx), row by row, so a chore reads as
 * struck only once the pen has passed over it. In the contact field it runs
 * stays out of the typing area and instead draws an arrow on the right,
 * pointing at the chore field. It ends by signing "Belal" inside `[data-pen-signature]` in the
 * footer, after which the pen slides into its cap.
 *
 * Pacing: going down the page the pen follows the scroll, but on a sideways
 * stroke it keeps its own steady speed and asks the scroll to wait (see
 * lib/scroll-pace.ts), because a level stretch of line is otherwise demanded
 * all at once by a few pixels of scrolling. The route is rebuilt from the real element positions on resize.
 *
 * Must be the first child of a `position: relative` wrapper around the page.
 */
export default function PageLine() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const penRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;
    const host = svg?.parentElement;
    const penBox = penRef.current;
    const penCanvas = penBox?.querySelector("canvas");
    if (!svg || !path || !host || !penBox || !penCanvas) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let length = 0;
    let line: Route | null = null;
    // The point a given distance along the line.
    const pointAt = (l: number) => {
      if (!line) return { x: 0, y: 0 };
      const { xs, ys, at } = line;
      const dist = Math.max(0, Math.min(line.total, l));
      let lo = 0;
      let hi = at.length - 1;
      while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (at[mid] <= dist) lo = mid;
        else hi = mid;
      }
      const span = at[hi] - at[lo];
      const f = span ? (dist - at[lo]) / span : 0;
      return { x: xs[lo] + (xs[hi] - xs[lo]) * f, y: ys[lo] + (ys[hi] - ys[lo]) * f };
    };
    // reach[i] is the lowest point the pen has touched after i steps of ink,
    // so a scroll position can be turned into "how much line to show".
    let reach: number[] = [];
    const STEP = 10;
    let frame = 0;
    // How much of the line is inked now, and how much the scroll asks for.
    let shown = 0;
    let wanted = 0;
    let lean = 0;
    let capped = 0;
    let lastTick = 0;
    let pen: Pen | null = null;
    const penScale = host.clientWidth >= 1024 ? 1.15 : 0.7;
    const penSize = Math.ceil(PEN_LENGTH * penScale * PEN_REACH);
    penBox.style.width = penBox.style.height = `${penSize}px`;
    let disposed = false;
    // The opening stretch starts as the hero name finishes settling.
    const introFrom = performance.now() + 450;

    // Once a message has been sent, the chore the visitor typed is shown
    // back to them to be crossed out. The first time it appears, the pen is
    // sent back to the start of it so the visitor watches it happen.
    let sentStruck = false;

    const box = (el: Element | null): Box | null => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const h = host.getBoundingClientRect();
      return { left: r.left - h.left, right: r.right - h.left, top: r.top - h.top, bottom: r.bottom - h.top, width: r.width, height: r.height };
    };

    const build = () => {
      const W = host.clientWidth;
      const wide = W >= 1024;
      const gutter = Math.min(64, Math.max(20, W * 0.04));
      const L = gutter * 0.45;
      const R = W - gutter * 0.45;
      const sway = gutter * 0.22;

      const hero = box(host.querySelector("#hero"));
      const about = box(host.querySelector("#about"));
      const contact = box(host.querySelector("#contact"));
      if (!hero || !about || !contact) return;

      const pts: Pt[] = [];
      // Indexes of points where the line turns sharply instead of curving.
      const corners = new Set<number>();
      const corner = (point: Pt) => {
        corners.add(pts.length);
        pts.push(point);
      };
      const at = (b: Box, fx: number, fy: number): Pt => [W * fx, b.top + b.height * fy];
      // Down the nearer margin past a block, for narrow screens where the text
      // fills the width and there is no empty column to run through.
      const margin = (top: number, bottom: number) => {
        const left = pts[pts.length - 1][0] < W / 2;
        const x = left ? L : R;
        pts.push([x, top], [x + (left ? sway : -sway), (top + bottom) / 2], [x, bottom]);
      };

      // Group the phrases to cross out into the rows they sit on.
      const rowsIn = (scope: Element): Row[] => {
        const rows: Row[] = [];
        let parent: Element | null = null;
        scope.querySelectorAll("[data-strike]").forEach((el) => {
          const b = box(el);
          if (!b || !b.width) return;
          const y = b.top + b.height * 0.56;
          const last = rows[rows.length - 1];
          if (last && parent === el.parentElement && Math.abs(last.y - y) < b.height * 0.5) {
            last.x1 = Math.min(last.x1, b.left);
            last.x2 = Math.max(last.x2, b.right);
          } else {
            rows.push({ x1: b.left, x2: b.right, y, h: b.height });
          }
          parent = el.parentElement;
        });
        return rows;
      };
      // Cross each row out with a slightly unsteady pass, starting from
      // whichever end is nearer, so stacked rows zigzag like a hand would.
      const strike = (rows: Row[]) =>
        rows.forEach((row) => {
          const pad = row.h * 0.07;
          const [a, b] = [row.x1 - pad, row.x2 + pad];
          const lastX = pts[pts.length - 1][0];
          const [from, to] = Math.abs(lastX - a) <= Math.abs(lastX - b) ? [a, b] : [b, a];
          const amp = Math.max(2, row.h * 0.035);
          pts.push(
            [from, row.y + amp * 0.5],
            [from + (to - from) * 0.33, row.y - amp],
            [from + (to - from) * 0.66, row.y + amp],
            [to, row.y - amp * 0.5]
          );
        });

      // Hero: down from the top edge, one loop in the empty paper beside the
      // first name, round the end of the surname, then across "problems".
      const surname = box(host.querySelector(".name-last"));
      if (wide) {
        pts.push([W * 0.62, 0], at(hero, 0.6, 0.1));
        pts.push(...loop(W * 0.7, hero.top + hero.height * 0.3, Math.min(W * 0.07, 120)));
        pts.push([W * 0.9, hero.top + hero.height * 0.4]);
        if (surname) pts.push([Math.min(R, surname.right + 150), surname.top + surname.height * 0.5], [surname.right + 40, surname.bottom - 6]);
        // Pass above the paragraph on the right, then come down on the near
        // side of "problems" so it is crossed out left to right and the line
        // leaves past the end of the sentence instead of through it.
        const aside = box(host.querySelector("#hero .grid > div"));
        const word = box(host.querySelector("#hero [data-strike]"));
        if (aside) pts.push([aside.left - 30, aside.top - 26]);
        if (word) pts.push([word.left - 36, word.top - word.height * 0.45]);
      } else {
        pts.push([W * 0.88, 0], [R, hero.top + hero.height * 0.12]);
        // Come in along the empty band under the name and drop onto the far
        // end of "problems", so it is struck right to left and the pen ends
        // at the left margin, which it can then follow down without dragging
        // a diagonal across the rest of the hero.
        const word = box(host.querySelector("#hero [data-strike]"));
        if (surname) pts.push([R, surname.bottom - 10]);
        if (surname && word) pts.push([word.right + 24, surname.bottom + 34]);
      }
      const heroEl = host.querySelector("#hero");
      if (heroEl) strike(rowsIn(heroEl));

      // About: on wide screens, down the gap between the heading and the text.
      if (wide) pts.push(at(about, 0.395, 0.14), at(about, 0.385, 0.5), at(about, 0.4, 0.84));
      else margin(about.top + about.height * 0.08, about.bottom - about.height * 0.05);

      // Work: cross out each project's chore, then run down between its text
      // and its screenshot to the next one.
      host.querySelectorAll("#work article").forEach((article) => {
        strike(rowsIn(article));
        const whole = box(article);
        const print = box(article.querySelector(".print-reveal"));
        if (!whole) return;
        if (wide && print) {
          const x = print.left - 20;
          pts.push([x, print.top + print.height * 0.12], [x + 8, print.top + print.height * 0.5], [x, print.bottom - print.height * 0.05]);
        } else {
          margin(pts[pts.length - 1][1] + 70, whole.bottom - 20);
        }
      });
      host.querySelectorAll("#work ul > li").forEach((row) => strike(rowsIn(row)));

      // Writing: down the gap between the dates and the titles.
      const list = box(host.querySelector("#articles ul"));
      const titles = box(host.querySelector("#articles li a > div"));
      if (list) {
        if (wide && titles) {
          const x = titles.left - 16;
          pts.push([x, list.top + 24], [x + 6, list.top + list.height * 0.5], [x, list.bottom - 24]);
        } else {
          margin(list.top + 20, list.bottom - 20);
        }
      }

      // Contact: the typing area is the visitor's, so the pen keeps to the
      // right of it and draws an arrow pointing at the chore field. As one
      // stroke: along the shaft from tail to tip, out and back for each barb
      // of the head, then back along the shaft, so the line leaves from the
      // tail and the head stays a clean arrowhead.
      const chore = box(host.querySelector("#chore"));
      if (chore) {
        // In the space the field leaves free on its right, level with the
        // text being typed, with the tip just clear of the field's edge.
        const y = chore.top + chore.height * 0.5;
        const tipX = chore.right + (wide ? 34 : 12);
        const tailX = wide ? Math.min(tipX + W * 0.16, W * 0.9) : R - 2;
        const barb = wide ? 30 : 14;
        // Slightly off level, so it looks drawn rather than ruled.
        const tail: Pt = [tailX, y - 3];
        const tip: Pt = [tipX, y + 2];
        if (wide) pts.push(at(contact, 0.82, 0.08));
        else pts.push([R, contact.top + 30]);
        pts.push([tailX + (wide ? 36 : 0), y - (wide ? 90 : 60)]);
        corner(tail);
        corner(tip);
        corner([tipX + barb * 0.82, tip[1] - barb * 0.62]);
        corner(tip);
        corner([tipX + barb * 0.82, tip[1] + barb * 0.62]);
        corner(tip);
        corner(tail);
      }

      // Contact, after a message is sent: cross out the visitor's own chore.
      let sentStart: Pt | null = null;
      const sentChore = host.querySelector("#contact [data-strike]");
      if (sentChore) {
        const rows = rowsIn(host.querySelector("#contact")!);
        if (rows.length) {
          if (wide) pts.push(at(contact, 0.72, 0.08));
          // Arrive above the near end of the first row, so it is struck left
          // to right and the pen leaves to the right, away from the text below.
          pts.push([rows[0].x1 + rows[0].h * 0.2, rows[0].y - rows[0].h * 0.8]);
          const mark = pts.length;
          strike(rows);
          sentStart = pts[mark];
        }
      } else {
        sentStruck = false;
      }

      // The end: sign "Belal".
      const sig = box(host.querySelector("[data-pen-signature]"));
      if (sig && sig.height) {
        // Sized to leave clear space above the tallest letters, so the stroke
        // arriving along the top does not read as a line drawn over the name.
        const unit = Math.min(sig.height / 3.1, (sig.width * 0.92) / SIGNATURE_WIDTH);
        const baseline = sig.bottom - unit * 0.2;
        // Down the empty right side of the form, then back along the gap
        // above the signature to where the B starts.
        const last = pts[pts.length - 1];
        const side = wide ? W * 0.84 : R;
        pts.push([side, (last[1] + sig.top) / 2], [side - sway, sig.top - 60], [W * 0.62, sig.top - 6], [W * 0.3, sig.top - 22], [sig.left + unit * 0.5, sig.top + unit * 0.12]);
        let x = sig.left;
        SIGNATURE.forEach((letter) => {
          letter.points.forEach(([lx, ly]) => pts.push([x + lx * unit, baseline - ly * unit]));
          x += letter.advance * unit;
        });
      }

      // The height of the content itself. Not scrollHeight: that includes this
      // SVG, so once the page got shorter (the contact form collapsing after
      // a message is sent) the old, taller SVG would hold the page open and
      // leave blank paper under the footer.
      const H = host.clientHeight;
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      svg.style.height = `${H}px`;
      line = route(pts, 5, W - 5, corners);
      path.setAttribute("d", line.d);
      // Dash lengths are measured in our own units, so the ink stops exactly
      // where pointAt says the nib is.
      path.setAttribute("pathLength", line.total.toFixed(1));
      path.style.strokeWidth = wide ? "7" : "4.5";

      length = line.total;
      reach = [];
      let lowest = 0;
      // Find how far along the line the sent chore starts while sampling.
      let nearSent = Infinity;
      let sentFrom = 0;
      for (let l = 0; l <= length; l += STEP) {
        const p = pointAt(l);
        lowest = Math.max(lowest, p.y);
        reach.push(lowest);
        if (sentStart) {
          const dSent = Math.hypot(p.x - sentStart[0], p.y - sentStart[1]);
          if (dSent < nearSent) [nearSent, sentFrom] = [dSent, l];
        }
      }
      if (sentStart && !sentStruck) {
        sentStruck = true;
        shown = Math.min(shown, sentFrom);
      }
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length - Math.min(shown, length)}`;
      path.style.opacity = "1";
      measure();
    };

    // Turn the scroll position into the length of line that should be inked.
    const measure = () => {
      if (!length) return;
      wanted = length;
      if (!still) {
        // The pen tip sits a little below the middle of the screen, sliding
        // down to the bottom edge over the last screen of the page so the
        // signature is written with the scroll instead of all at once.
        const view = window.innerHeight;
        const left = document.documentElement.scrollHeight - view - window.scrollY;
        const closing = Math.max(0, Math.min(1, 1 - left / (view * 0.8)));
        const hostTop = host.getBoundingClientRect().top + window.scrollY;
        const target = window.scrollY + view * (0.62 + 0.38 * closing) - hostTop;
        let lo = 0;
        let hi = reach.length - 1;
        while (lo < hi) {
          const mid = (lo + hi) >> 1;
          if (reach[mid] < target) lo = mid + 1;
          else hi = mid;
        }
        wanted = left <= 2 ? length : Math.min(length, lo * STEP);
      }
      if (!frame) frame = requestAnimationFrame(tick);
    };

    // Ease the ink towards where the scroll wants it, and carry the pen along.
    const tick = (now: number) => {
      frame = 0;
      if (!length) return;

      const before = shown;
      // Frames elapsed since the last tick, so the pace holds on any display.
      const frames = lastTick ? Math.min(3, (now - lastTick) / 16.67) : 1;
      lastTick = now;
      const behind = wanted - shown;

      if (still) shown = wanted;
      else if (now < introFrom) shown = 0;
      else if (behind <= 0 || behind > JUMPED) shown += behind * 0.22;
      else {
        // How level the line is just ahead of the nib: 0 straight down, 1 flat.
        // A flat stretch is asked for all at once by a few pixels of scroll,
        // so there the pen keeps its own pace; going down it tracks the scroll.
        const here = pointAt(shown);
        const ahead = pointAt(Math.min(length, shown + 14));
        const flat = 1 - Math.abs(ahead.y - here.y) / (Math.hypot(ahead.x - here.x, ahead.y - here.y) || 1);
        let pace = (PEN_SPEED * frames) / Math.max(0.07, flat);
        // Ease into the stop instead of hitting it at full speed.
        shown += Math.min(pace, behind * 0.25 + 0.5, behind);
      }
      if (Math.abs(wanted - shown) < 0.5) shown = wanted;
      path.style.strokeDashoffset = `${length - shown}`;

      // While the pen is busy, hold the scroll back so the page waits for it.
      const lag = wanted - shown;
      scrollPace.factor =
        still || lag <= WAIT_FROM || lag > JUMPED ? 1 : Math.max(SLOWEST, 1 - (lag - WAIT_FROM) / WAIT_OVER);

      const tip = pointAt(shown);
      const back = pointAt(Math.max(0, shown - 14));
      const travel = shown - before;
      // The pen stands upright at rest and leans while it moves sideways,
      // trailing behind the nib.
      const heading = Math.hypot(tip.x - back.x, tip.y - back.y) || 1;
      const leanWanted = ((tip.x - back.x) / heading) * Math.max(-1, Math.min(1, travel / 40)) * 0.7;
      lean = still ? leanWanted : lean + (leanWanted - lean) * 0.12;

      penBox.style.transform = `translate(${tip.x - penSize / 2}px, ${tip.y - penSize / 2}px)`;
      penBox.style.opacity = still || now >= introFrom ? "1" : "0";
      // With the signature finished, the pen lifts off and slides into its cap.
      const finished = shown >= length - 0.5;
      capped += ((finished ? 1 : 0) - capped) * (still ? 1 : 0.03);
      if (Math.abs((finished ? 1 : 0) - capped) < 0.002) capped = finished ? 1 : 0;
      pen?.render({ lean, roll: shown / 70, capped });

      const settled =
        shown === wanted && Math.abs(leanWanted - lean) < 0.003 && now >= introFrom && capped === (finished ? 1 : 0);
      if (!settled) frame = requestAnimationFrame(tick);
      else lastTick = 0;
    };

    // three.js is only fetched once the page is up, and the line works without it.
    import("@/lib/pen3d").then(({ createPen }) => {
      if (disposed) return;
      const css = getComputedStyle(host);
      pen = createPen(penCanvas, penSize, penScale, {
        mark: css.getPropertyValue("--color-mark").trim() || "#FF4C65",
        ink: css.getPropertyValue("--color-ink").trim() || "#1B2CC1",
        paper: css.getPropertyValue("--color-paper").trim() || "#EFF0EC",
      });
      if (!frame) frame = requestAnimationFrame(tick);
    });

    build();
    const observer = new ResizeObserver(build);
    observer.observe(host);
    window.addEventListener("scroll", measure, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", measure);
      cancelAnimationFrame(frame);
      scrollPace.factor = 1;
      disposed = true;
      pen?.dispose();
    };
  }, []);

  return (
    <>
      <svg
        ref={svgRef}
        aria-hidden="true"
        className="absolute top-0 left-0 z-20 w-full pointer-events-none overflow-hidden"
        fill="none"
      >
        <path
          ref={pathRef}
          stroke="var(--color-mark)"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: 0 }}
        />
      </svg>
      {/* Clipped to the page: the pen's canvas is much wider than the pen and
          would otherwise stretch the page sideways near the edges. */}
      <div aria-hidden="true" className="absolute inset-0 z-30 overflow-hidden pointer-events-none">
        <div
          ref={penRef}
          className="absolute top-0 left-0 transition-opacity duration-500"
          style={{ opacity: 0 }}
        >
          <canvas className="w-full h-full" />
        </div>
      </div>
    </>
  );
}
