import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { scrollState } from "./scroll-state";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

/** Access the live Lenis instance (null under reduced-motion / SSR). */
export const useLenis = () => useContext(LenisContext);

/**
 * Wraps the app in Lenis smooth-scroll and keeps GSAP ScrollTrigger in sync
 * via a single shared ticker (the recommended integration). Under
 * prefers-reduced-motion we skip Lenis entirely and fall back to native
 * scrolling, so the page still works perfectly with JS motion disabled.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (reduce) return; // native scroll — graceful degradation

    const instance = new Lenis({
      lerp: 0.1, // inertia: lower = smoother/heavier
      wheelMultiplier: 1,
      smoothWheel: true,
    });
    setLenis(instance);

    // Lenis passes the instance itself to the scroll listener.
    instance.on("scroll", (e: Lenis) => {
      scrollState.velocity = e.velocity;
      scrollState.direction = e.direction;
      scrollState.progress = e.progress;
      ScrollTrigger.update();
    });

    // Drive Lenis from GSAP's ticker so both share one rAF loop.
    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      instance.destroy();
      setLenis(null);
    };
  }, [reduce]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
