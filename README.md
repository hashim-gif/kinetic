# Kinetic Animated Creative Studio Template

An award-tier, single-page creative-studio landing page. Editorial-meets-tech
aesthetic, heavy on motion quality: smooth-scroll inertia, scroll-choreographed
sections, a custom cursor, magnetic interactions, and a tasteful page-load
sequence. Built to be rebranded and extended.

## Stack

- **React 19 + TypeScript** (Vite)
- **Tailwind CSS v4** (theme via `@theme`, no config file)
- **Framer Motion** — component/scroll reveals, masked headline, parallax
- **GSAP + ScrollTrigger** — the cinematic scrubbed sequences (manifesto fade,
  process line draw)
- **Lenis** — page-wide smooth-scroll inertia, shared with GSAP's ticker

No design-system dependencies beyond the above.

## Run

```bash
npm install
npm run dev      # http://localhost:5174
npm run build    # type-check + production bundle
npm run preview  # serve the build
```

## Sections

1. **Hero** — masked, staggered word reveal; animated gradient + grain; scroll cue; parallax on exit.
2. **Marquee** — infinite ticker that reads live scroll velocity (speeds up / reverses / skews).
3. **Selected Work** — project grid with hover image-scale, accent wipe-in, magnetic title; staggered scroll reveal.
4. **Services** — capability rows that expand on hover/focus with a growing accent underline.
5. **Manifesto** — word-by-word opacity fade scrubbed to scroll (GSAP ScrollTrigger).
6. **Process** — numbered steps with an SVG line that draws itself as you scroll.
7. **Contact** — magnetic CTA button + email link with an underline-grow.
8. **Footer** — socials, back-to-top, and a live clock.

## Rebranding

**Colors & fonts live in one place:** the `@theme` block at the top of
[`src/index.css`](src/index.css). Edit the six `--color-*` values to reskin the
whole site. A ready-to-paste **light-mode palette** is included as a commented
block directly below it. Fonts are loaded in [`index.html`](index.html).

## Motion & accessibility notes

- All animation is `transform`/`opacity` only — GPU-friendly, targets 60fps.
- Signature easing `cubic-bezier(0.16, 1, 0.3, 1)` (exposed as `--ease-out-expo`
  in CSS and `EASE` in [`src/lib/motion.ts`](src/lib/motion.ts)).
- **`prefers-reduced-motion` is fully respected:** Lenis, parallax, the custom
  cursor, the marquee loop, and both GSAP scrubs all fall back to static /
  simple-fade states. The page is fully usable with JS motion disabled.
- Semantic HTML, visible focus rings, keyboard-navigable, custom cursor
  auto-disables on touch devices.

## Project structure

```
src/
  index.css            Theme tokens, base styles, cursor/grain/keyframes
  main.tsx, App.tsx    Entry + section composition
  lib/
    SmoothScroll.tsx   Lenis + GSAP ScrollTrigger integration (context)
    scroll-state.ts    Mutable singleton bridging scroll velocity to rAF loops
    useMagnetic.ts     Reusable magnetic-hover hook
    motion.ts          Shared easing + Framer variants
  components/          One file per section + Cursor, Preloader, Nav
```
