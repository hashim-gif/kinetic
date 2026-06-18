import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "framer-motion";
// ScrollTrigger is registered once in SmoothScroll.tsx.

const TEXT =
  "We believe motion is meaning. The way a thing moves tells you what it is, how it feels, and whether it's worth your attention. So we sweat the milliseconds — because design that moves well, moves people.";

/**
 * Scroll-linked manifesto: each word fades from dim to full as the block
 * scrolls through the viewport (GSAP ScrollTrigger, scrubbed). Under
 * reduced-motion the words simply render at full opacity.
 */
export function Manifesto() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;

    const words = el.querySelectorAll<HTMLSpanElement>("[data-word]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.15 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 55%",
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id="about" className="px-6 py-28 md:px-10 md:py-48">
      <div className="mx-auto max-w-[1300px]">
        <span className="machine mb-10 block text-xs text-muted">
          Manifesto
        </span>
        <p
          ref={ref}
          className="text-[clamp(1.6rem,5vw,4rem)] font-display font-medium leading-[1.1] tracking-tight"
        >
          {TEXT.split(" ").map((word, i) => (
            <span
              key={i}
              data-word
              style={{ opacity: reduce ? 1 : 0.15 }}
              className="inline-block"
            >
              {word}&nbsp;
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
