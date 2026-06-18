import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "../lib/motion";

/**
 * Page-load sequence: a quick count to 100 behind a panel that then wipes
 * upward to reveal the page. Total time < 1.2s. `onDone` fires when the
 * reveal is complete so the hero can start its own entrance in sequence.
 *
 * Under reduced-motion it skips straight to done on mount.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (reduce) {
      onDone();
      setHidden(true);
      return;
    }
    const start = performance.now();
    const DURATION = 900;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      // easeOutExpo on the number for a snappy finish
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setHidden(true); // triggers the wipe-up below
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, onDone]);

  if (reduce) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex items-end justify-between bg-base px-6 pb-8 md:px-10 md:pb-10"
      initial={{ y: 0 }}
      animate={hidden ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.9, ease: EASE }}
      onAnimationComplete={() => hidden && onDone()}
      aria-hidden
    >
      <span className="machine text-xs text-muted">Kinetic Studio©</span>
      <span className="font-display text-[18vw] leading-none tracking-tighter text-ink md:text-[10vw]">
        {count}
        <span className="text-accent">%</span>
      </span>
    </motion.div>
  );
}
