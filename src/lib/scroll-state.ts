/**
 * A tiny mutable singleton that bridges Lenis' scroll events to any component
 * that wants to read scroll velocity/direction inside its own rAF loop
 * (e.g. the velocity-reactive marquee) WITHOUT triggering React re-renders.
 *
 * Read it freely in animation loops; it is updated once per Lenis tick.
 */
export const scrollState = {
  /** Signed scroll velocity (px/frame-ish). Positive = scrolling down. */
  velocity: 0,
  /** 1 = scrolling down, -1 = scrolling up, 0 = idle. */
  direction: 0 as 0 | 1 | -1,
  /** 0 → 1 progress through the whole page. */
  progress: 0,
};
