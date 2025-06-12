import About from "../sections/About";
import Hero from "../sections/Hero";
import Navbar from "../sections/Navbar";
import { navLinks } from "../constants";
import Projects from "../sections/Projects";

const Home = () => {
  return (
    <>
      <Navbar navLinks={navLinks} />
      <Hero />
      <About />
      <Projects />
    </>
  );
};

export default Home;
