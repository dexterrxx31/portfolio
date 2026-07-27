import { lazy, Suspense, useState } from "react";
import BootLoader from "./components/BootLoader";
import CursorWand from "./components/CursorWand";
import ScrollProgress from "./components/ScrollProgress";
import RoboCat from "./components/RoboCat";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
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
      <CursorWand />
      <ScrollProgress />
      <RoboCat />
      <div className="relative">
        <Navbar />
        <main>
          <Hero />
          <About />
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
