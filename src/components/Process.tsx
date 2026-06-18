import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion, useReducedMotion } from "framer-motion";
// ScrollTrigger is registered once in SmoothScroll.tsx.
import { fadeUp, inView } from "../lib/motion";

const STEPS = [
  { no: "01", title: "Discover", desc: "We dig into the brief, the market and the why. Sharp questions before any pixels." },
  { no: "02", title: "Define", desc: "Strategy and direction lock in. We agree on the one idea everything hangs from." },
  { no: "03", title: "Design", desc: "Identity, interface and motion come together in tight, reviewable loops." },
  { no: "04", title: "Deliver", desc: "We build, polish and ship — then make sure it runs at 60fps in the wild." },
];

/**
 * Process timeline. A vertical SVG path "draws" itself (stroke-dashoffset)
 * as the section scrolls past, while each step fades up on entry. Reduced
 * motion shows the line fully drawn and skips the scrub.
 */
export function Process() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;

    if (reduce) {
      path.style.strokeDashoffset = "0";
      return;
    }
    path.style.strokeDashoffset = `${len}`;

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 75%",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section className="px-6 py-24 md:px-10 md:py-40">
      <div ref={sectionRef} className="mx-auto max-w-[1300px]">
        <span className="machine mb-12 block text-xs text-muted">
          How we work
        </span>

        <div className="relative grid grid-cols-1 gap-12 md:grid-cols-[80px_1fr]">
          {/* Drawing line — sits in the left gutter on desktop */}
          <svg
            className="pointer-events-none absolute left-[7px] top-2 hidden h-full w-4 md:block"
            viewBox="0 0 4 1000"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              ref={pathRef}
              d="M2 0 V1000"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2"
            />
          </svg>

          {STEPS.map((step, i) => (
            <div key={step.no} className="contents">
              {/* Node marker (desktop column) */}
              <div className="relative hidden md:block">
                <span className="absolute left-0 top-1 h-4 w-4 rounded-full border-2 border-accent bg-base" />
              </div>

              <motion.div
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={inView}
                className="border-b border-[color:var(--color-ink)]/10 pb-12"
              >
                <div className="flex items-baseline gap-5">
                  <span className="machine text-xs text-accent md:hidden">
                    {step.no}
                  </span>
                  <h3 className="text-[clamp(1.75rem,5vw,3rem)] font-medium tracking-tight">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-[color:var(--color-ink)]/70">
                  {step.desc}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
