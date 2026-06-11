import About from "../sections/About";
import Hero from "../sections/Hero";
import Navbar from "../sections/Navbar";
import { navLinks } from "../constants";
import Projects from "../sections/Projects";
import usePageMeta from "../components/usePageMeta";
import pageMeta from "../constants/pageMeta.json";

const Home = () => {
  usePageMeta(pageMeta.routes["/"].title, pageMeta.routes["/"].description);
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
