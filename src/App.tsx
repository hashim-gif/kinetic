import { useState } from "react";
import { SmoothScroll } from "./lib/SmoothScroll";
import { Cursor } from "./components/Cursor";
import { Preloader } from "./components/Preloader";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Work } from "./components/Work";
import { Services } from "./components/Services";
import { Manifesto } from "./components/Manifesto";
import { Process } from "./components/Process";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  // `ready` flips when the preloader finishes, sequencing the hero reveal.
  const [ready, setReady] = useState(false);

  return (
    <SmoothScroll>
      <Cursor />
      <Preloader onDone={() => setReady(true)} />

      <Nav />

      <main>
        <Hero ready={ready} />
        <Marquee />
        <Work />
        <Services />
        <Manifesto />
        <Process />
        <Contact />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
