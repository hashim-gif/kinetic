import { motion } from "framer-motion";
import { fadeUp, inView } from "../lib/motion";

type Project = {
  title: string;
  category: string;
  year: string;
  /** Two-stop gradient used as an intentional placeholder "cover". */
  from: string;
  to: string;
};

const PROJECTS: Project[] = [
  { title: "Voltaic", category: "Brand · Web", year: "2025", from: "#1c2a0a", to: "#c6ff3a" },
  { title: "Mira OS", category: "Product · Motion", year: "2025", from: "#2a0f0c", to: "#ff6b5c" },
  { title: "Northwind", category: "Identity", year: "2024", from: "#0e1116", to: "#6b6b70" },
  { title: "Halcyon", category: "WebGL · Art Direction", year: "2024", from: "#101b1b", to: "#7be0d6" },
  { title: "Fathom", category: "Editorial · Web", year: "2023", from: "#1a1410", to: "#e0a458" },
  { title: "Pulse", category: "Campaign · Motion", year: "2023", from: "#160a24", to: "#9b6bff" },
];

function Card({ project, index }: { project: Project; index: number }) {
  // First card spans two columns on desktop for a deliberately broken grid.
  const wide = index === 0;
  return (
    <motion.article
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className={`group relative ${wide ? "md:col-span-2" : ""}`}
    >
      <a
        href="#contact"
        data-cursor
        data-cursor-label="View"
        className="block focus-visible:outline-none"
        aria-label={`${project.title} — ${project.category}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
          {/* Cover */}
          <div
            className="absolute inset-0 scale-100 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            style={{
              backgroundImage: `linear-gradient(135deg, ${project.from}, ${project.to})`,
            }}
          />
          <div className="grain absolute inset-0 opacity-60" />

          {/* Accent overlay wipes up on hover */}
          <div className="absolute inset-0 flex translate-y-full items-end bg-accent p-6 transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
            <span className="flex w-full items-center justify-between text-base">
              <span className="font-display font-medium text-base text-[color:var(--color-base)]">
                View project
              </span>
              <span className="text-2xl text-[color:var(--color-base)]">→</span>
            </span>
          </div>
        </div>

        {/* Meta — title shifts right on hover (magnetic-lite) */}
        <div className="mt-5 flex items-baseline justify-between gap-4">
          <h3 className="text-2xl font-medium tracking-tight transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 md:text-3xl">
            {project.title}
          </h3>
          <span className="machine shrink-0 text-xs text-muted">{project.year}</span>
        </div>
        <p className="mt-1 text-sm text-muted">{project.category}</p>
      </a>
    </motion.article>
  );
}

export function Work() {
  return (
    <section id="work" className="px-6 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-14 flex items-end justify-between">
          <h2 className="text-[clamp(2rem,6vw,5rem)] font-medium leading-[0.95] tracking-tight">
            Selected
            <br />
            <span className="text-muted">Work</span>
          </h2>
          <span className="machine hidden text-xs text-muted md:block">
            (06) Projects
          </span>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Card key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
