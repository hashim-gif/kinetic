import type { Variants } from "framer-motion";

/** Signature reveal easing (expo-out). Mirrors --ease-out-expo in CSS. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/** Fade + translate-up. `custom` (number) controls the stagger delay index. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay: i * 0.07 },
  }),
};

/** Word/letter mask: slides up from behind an `overflow:hidden` parent. */
export const maskUp: Variants = {
  hidden: { y: "110%" },
  show: (i: number = 0) => ({
    y: "0%",
    transition: { duration: 1, ease: EASE, delay: 0.05 + i * 0.06 },
  }),
};

/** Standard viewport trigger for scroll reveals. */
export const inView = { once: true, amount: 0.3 } as const;
