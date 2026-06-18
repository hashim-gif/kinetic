import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { maskUp, EASE } from "../lib/motion";

/** Headline broken into lines → words, each word masked for a staggered reveal. */
const LINES: { text: string; accent?: boolean }[][] = [
  [{ text: "We" }, { text: "design" }],
  [{ text: "things" }, { text: "that" }],
  [{ text: "move", accent: true }],
];

/**
 * Hero: oversized masked headline that reveals once the preloader finishes
 * (`ready`), an animated gradient + grain backdrop, and a scroll cue. The
 * content parallaxes gently as you scroll out. Parallax is disabled under
 * reduced-motion.
 */
export function Hero({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Parallax: content drifts up + fades as the section leaves.
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  let wordIndex = 0; // running index so the stagger flows across all lines

  return (
    <section
      id="top"
      ref={ref}
      className="grain relative flex min-h-svh flex-col justify-end overflow-hidden px-6 pb-[8vh] pt-32 md:px-10"
    >
      {/* Animated gradient backdrop (transform/opacity only). */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute -left-1/4 top-[-20%] h-[80vh] w-[80vh] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, var(--color-accent), transparent 60%)", opacity: 0.18 }}
          animate={reduce ? {} : { x: [0, 120, 0], y: [0, 60, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-1/4 bottom-[-20%] h-[70vh] w-[70vh] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, var(--color-coral), transparent 60%)", opacity: 0.16 }}
          animate={reduce ? {} : { x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div style={{ y, opacity }} className="mx-auto w-full max-w-[1600px]">
        {/* Kicker */}
        <motion.div
          className="mb-8 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
          <span className="machine text-xs text-muted">
            Independent Creative Studio — Est. 2019
          </span>
        </motion.div>

        {/* Masked headline */}
        <h1 className="max-w-[18ch] text-[clamp(3rem,13vw,12rem)] font-medium leading-[0.92] tracking-[-0.04em]">
          {LINES.map((line, li) => (
            <span key={li} className="mask-line">
              {line.map((word) => {
                const i = wordIndex++;
                return (
                  <motion.span
                    key={word.text}
                    className={`inline-block ${word.accent ? "text-accent italic" : ""}`}
                    custom={i}
                    variants={maskUp}
                    initial="hidden"
                    animate={ready ? "show" : "hidden"}
                  >
                    {word.text}
                    {/* keep natural spacing between words */}
                    {" "}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </h1>

        {/* Sub copy + scroll cue */}
        <motion.div
          className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
        >
          <p className="max-w-md text-base leading-relaxed text-[color:var(--color-ink)]/70">
            A design &amp; motion studio building brands, interfaces and
            experiences that refuse to sit still. Strategy, identity, and
            interaction — engineered to feel alive.
          </p>

          <div className="flex items-center gap-3 text-muted">
            <span className="machine text-[10px]">Scroll</span>
            <span className="relative block h-8 w-px overflow-hidden bg-[color:var(--color-muted)]/40">
              {!reduce && (
                <span
                  className="absolute inset-x-0 top-0 h-3 bg-accent"
                  style={{ animation: "cue 1.6s var(--ease-out-expo) infinite" }}
                />
              )}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
