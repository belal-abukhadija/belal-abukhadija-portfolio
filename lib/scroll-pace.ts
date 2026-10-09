/**
 * How much of each downward wheel movement the page should actually scroll,
 * from 1 (all of it) down towards 0. PageLine lowers it while the pen is busy
 * with a sideways stroke, and SmoothScroll applies it, so the scroll waits
 * for the drawing instead of the drawing racing to keep up with the scroll.
 */
export const scrollPace = { factor: 1 };
