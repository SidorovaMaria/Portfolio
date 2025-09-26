import NavBar from "./components/NavBar";
import AboutMe from "./sections/AboutMe";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <AboutMe />
      <Projects />
      <Analytics />
    </>
  );
};

export default App;
