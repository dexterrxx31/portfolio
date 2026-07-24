import { lazy, Suspense, useState } from "react";
import BootLoader from "./components/BootLoader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Stats from "./components/Stats";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Terminal from "./components/Terminal";
import Hobbies from "./components/Hobbies";
import Footer from "./components/Footer";

// Below-the-fold, image-heavy — split into its own chunk so first load stays lean.
const Photography = lazy(() => import("./components/Photography"));

export default function App() {
  const [booted, setBooted] = useState(
    () => sessionStorage.getItem("booted") === "1",
  );

  const finishBoot = () => {
    sessionStorage.setItem("booted", "1");
    setBooted(true);
  };

  return (
    <>
      {!booted && <BootLoader onDone={finishBoot} />}
      <div className="relative">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Stats />
          <Experience />
          <Projects />
          <Skills />
          <Terminal />
          <Hobbies />
          <Suspense fallback={<div className="h-96" />}>
            <Photography />
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
}
