import { motion } from "framer-motion";
import { useMagnetic } from "../lib/useMagnetic";
import { fadeUp, inView } from "../lib/motion";

/** Big magnetic CTA button. The label counter-moves slightly for depth. */
function MagneticCTA() {
  const ref = useMagnetic<HTMLAnchorElement>(0.45);
  return (
    <a
      ref={ref}
      href="mailto:hello@kinetic.studio"
      data-cursor
      className="group relative inline-flex h-44 w-44 items-center justify-center rounded-full bg-accent text-base transition-colors duration-300 hover:bg-ink md:h-56 md:w-56"
    >
      <span className="font-display text-lg font-medium tracking-tight">
        Start a project
      </span>
      <span className="absolute bottom-8 text-xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1">
        ↗
      </span>
    </a>
  );
}

export function Contact() {
  return (
    <section id="contact" className="px-6 py-28 md:px-10 md:py-48">
      <div className="mx-auto flex max-w-[1600px] flex-col items-center gap-16 text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="text-[clamp(2.5rem,10vw,9rem)] font-medium leading-[0.9] tracking-[-0.04em]"
        >
          Let&apos;s make
          <br />
          <span className="text-accent italic">something move.</span>
        </motion.h2>

        <MagneticCTA />

        {/* Email with underline-grow on hover */}
        <a
          href="mailto:hello@kinetic.studio"
          data-cursor
          className="group relative text-lg text-muted transition-colors hover:text-ink md:text-2xl"
        >
          hello@kinetic.studio
          <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
        </a>
      </div>
    </section>
  );
}
