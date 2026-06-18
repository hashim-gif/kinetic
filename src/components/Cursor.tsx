import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Lerp-follow custom cursor. A small dot normally; grows + shows a label when
 * hovering anything interactive ([data-cursor], links, buttons). Optionally
 * displays text from a `data-cursor-label` attribute on the hovered element.
 *
 * Auto-disables on touch devices and under prefers-reduced-motion, restoring
 * the native cursor — so nothing is lost when motion is off.
 */
export function Cursor() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    document.body.classList.add("has-custom-cursor");

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...pos };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      if (rootRef.current) {
        rootRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    const interactiveSel = "a, button, [data-cursor]";
    const onOver = (e: Event) => {
      const el = (e.target as HTMLElement).closest(interactiveSel);
      if (el) {
        setHovering(true);
        setLabel(el.getAttribute("data-cursor-label") ?? "");
      }
    };
    const onOut = (e: Event) => {
      const el = (e.target as HTMLElement).closest(interactiveSel);
      if (el) {
        setHovering(false);
        setLabel("");
      }
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <div ref={rootRef} className="cursor" data-hovering={hovering} aria-hidden>
      <div className="cursor__dot">
        <span className="cursor__label">{label}</span>
      </div>
    </div>
  );
}
