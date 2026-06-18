import { useEffect, useState } from "react";
import { useLenis } from "../lib/SmoothScroll";

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "Twitter / X", href: "#" },
  { label: "Dribbble", href: "#" },
  { label: "LinkedIn", href: "#" },
];

/** Live clock — the small rewarding detail. Locale time, ticks each second. */
function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="machine text-xs text-muted">
      <span className="text-accent">●</span> {time} — Remote / Worldwide
    </span>
  );
}

export function Footer() {
  const lenis = useLenis();
  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[color:var(--color-ink)]/10 px-6 py-12 md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                toTop();
              }}
              className="font-display text-3xl font-medium tracking-tight"
            >
              Kinetic<span className="text-accent">.</span>
            </a>
            <p className="mt-3 max-w-xs text-sm text-muted">
              A design &amp; motion studio for brands that won&apos;t sit still.
            </p>
          </div>

          <nav className="flex flex-col gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                data-cursor
                className="group flex w-fit items-center gap-2 text-sm text-ink transition-colors hover:text-accent"
              >
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  {s.label}
                </span>
                <span className="opacity-0 transition-opacity group-hover:opacity-100">
                  ↗
                </span>
              </a>
            ))}
          </nav>

          <button
            onClick={toTop}
            data-cursor
            className="machine flex items-center gap-2 self-start text-xs text-muted transition-colors hover:text-ink"
          >
            <span className="text-accent">↑</span> Back to top
          </button>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[color:var(--color-ink)]/10 pt-6 md:flex-row md:items-center md:justify-between">
          <Clock />
          <span className="machine text-xs text-muted">
            © {new Date().getFullYear()} Kinetic Studio — Template
          </span>
        </div>
      </div>
    </footer>
  );
}
