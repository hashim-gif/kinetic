import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { scrollState } from "../lib/scroll-state";

const ITEMS = [
  "Brand Identity",
  "Art Direction",
  "Motion Design",
  "Web Experiences",
  "Creative Strategy",
  "3D & WebGL",
];

/**
 * Infinite horizontal ticker. It drifts on its own, but reads live scroll
 * velocity from `scrollState` each frame: fast scrolling speeds it up and
 * scrolling up briefly reverses it, with a subtle skew for energy. Under
 * reduced-motion it renders as a static, readable strip.
 */
export function Marquee() {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reduce) return;

    let x = 0;
    let raf = 0;
    const BASE = 0.6; // idle drift (px/frame)

    const loop = () => {
      // velocity is signed; scrolling down pushes left, up nudges right
      const v = scrollState.velocity;
      x -= BASE + v * 0.25;

      // wrap seamlessly: the track holds two identical halves
      const half = track.scrollWidth / 2;
      if (half > 0) {
        if (x <= -half) x += half;
        if (x > 0) x -= half;
      }

      const skew = Math.max(-8, Math.min(8, v * 0.4));
      track.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0) skewX(${skew.toFixed(2)}deg)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  // Duplicate the items so the track can wrap without a visible seam.
  const row = [...ITEMS, ...ITEMS];

  return (
    <section
      aria-label="Studio services"
      className="border-y border-[color:var(--color-ink)]/10 bg-panel py-6 md:py-8"
    >
      <div
        ref={trackRef}
        className="flex w-max items-center whitespace-nowrap will-change-transform"
      >
        {(reduce ? ITEMS : row).map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="px-8 text-[clamp(1.5rem,4vw,3rem)] font-display font-medium tracking-tight text-ink">
              {item}
            </span>
            <span className="text-2xl text-accent">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
