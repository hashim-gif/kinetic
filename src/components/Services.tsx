import { motion } from "framer-motion";
import { fadeUp, inView } from "../lib/motion";

const SERVICES = [
  {
    no: "01",
    title: "Brand & Identity",
    desc: "Naming, visual systems, and the rules that keep a brand coherent as it scales across every surface.",
    tags: ["Strategy", "Logo Systems", "Guidelines"],
  },
  {
    no: "02",
    title: "Digital Product",
    desc: "End-to-end interface design and prototyping — from first sketch to a polished, build-ready system.",
    tags: ["UX/UI", "Design Systems", "Prototyping"],
  },
  {
    no: "03",
    title: "Motion & Interaction",
    desc: "The choreography layer: scroll experiences, micro-interactions, and the timing that makes things feel alive.",
    tags: ["Web Animation", "GSAP / WebGL", "Direction"],
  },
  {
    no: "04",
    title: "Creative Development",
    desc: "We build what we design. Performance-minded front-ends that ship the motion without the jank.",
    tags: ["React", "Three.js", "Headless"],
  },
];

function Row({ service, index }: { service: (typeof SERVICES)[number]; index: number }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      data-cursor
      tabIndex={0}
      className="group relative border-t border-[color:var(--color-ink)]/12 py-8 outline-none transition-colors last:border-b focus-visible:bg-[color:var(--color-ink)]/[0.03] md:py-10"
    >
      <div className="flex items-baseline gap-6 md:gap-12">
        <span className="machine text-xs text-muted">{service.no}</span>
        <h3 className="relative text-[clamp(1.75rem,5vw,3.5rem)] font-medium leading-none tracking-tight">
          <span className="relative inline-block">
            {service.title}
            {/* Accent underline grows from the left on hover/focus */}
            <span className="absolute -bottom-1 left-0 h-[3px] w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100" />
          </span>
        </h3>
      </div>

      {/* Detail reveals on hover/focus via grid-rows (cheap, no layout thrash) */}
      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] md:pl-[calc(2rem+1.5rem)]">
        <div className="overflow-hidden">
          <div className="flex flex-col gap-4 pt-5 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-sm leading-relaxed text-[color:var(--color-ink)]/70">
              {service.desc}
            </p>
            <ul className="flex flex-wrap gap-2">
              {service.tags.map((t) => (
                <li
                  key={t}
                  className="machine rounded-full border border-[color:var(--color-ink)]/15 px-3 py-1 text-[10px] text-muted"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="bg-panel px-6 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <span className="machine mb-12 block text-xs text-muted">
          What we do
        </span>
        <div>
          {SERVICES.map((s, i) => (
            <Row key={s.no} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
