import Navbar from "../sections/Navbar";
import { navLinks } from "../constants";
import BetaDirichletExplainer from "../components/BetaDirichletExplainer";
import usePageMeta from "../components/usePageMeta";
import pageMeta from "../constants/pageMeta.json";

const Tools = () => {
  usePageMeta(pageMeta.routes["/tools"].title, pageMeta.routes["/tools"].description);
  return (
    <>
      <Navbar navLinks={navLinks} />
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
        <h1 className="sm:text-4xl text-2xl font-bold text-white text-center font-sans">Tools</h1>
        <p className="text-[#afb0b6] text-center max-w-2xl mx-auto font-sans">
          Small interactive widgets for building intuition about the maths behind my notes and blog posts.
        </p>
        <div className="w-full max-w-6xl mx-auto mt-6">
          <BetaDirichletExplainer />
        </div>
      </div>
    </>
  );
};

export default Tools;
