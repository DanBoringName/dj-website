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
          Small interactive widgets for building intuition about the maths behind my notes and blog posts, plus the
          libraries I build along the way.
        </p>
        <div className="w-full max-w-6xl mx-auto mt-6">
          <BetaDirichletExplainer />
        </div>

        <div className="w-full max-w-6xl mx-auto mt-10 rounded-2xl border border-neutral-700 bg-neutral-900/60 p-6 sm:p-8">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 items-center">
            <div className="rounded-xl overflow-hidden border border-neutral-700 bg-black">
              <img
                src="/assets/cpomdp_bacillus.gif"
                alt="A cpomdp agent navigating to a food target — its belief (orange +) and uncertainty (blue ellipse) updating by Kalman filtering while an LQR controller steers it toward the goal (star)."
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col gap-4 font-sans">
              <h2 className="text-2xl font-bold text-white">cpomdp</h2>
              <p className="text-[#afb0b6]">
                Continuous active inference for Python — the continuous-state sibling of pymdp. Hand it a linear-Gaussian
                model of how the world moves and what you can see of it, and you get an agent that perceives by Kalman
                filtering and acts by steady-state LQR, through the familiar <code>infer_states</code> /{" "}
                <code>sample_action</code> loop. v0.1.1, pre-alpha and solo-built.
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <a
                  className="flex items-center gap-2 text-white hover:text-[#afb0b6] transition-colors"
                  href="https://danboringname.github.io/cpomdp/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <p>Read the docs</p>
                  <img src="/assets/arrow-up.png" className="w-3 h-3" alt="" aria-hidden="true" />
                </a>
                <a
                  className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
                  href="https://github.com/DanBoringName/cpomdp"
                  target="_blank"
                  rel="noreferrer"
                >
                  <p>Source on GitHub</p>
                  <img src="/assets/arrow-up.png" className="w-3 h-3" alt="" aria-hidden="true" />
                </a>
                <a
                  className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
                  href="https://pypi.org/project/cpomdp/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <p>cpomdp on PyPI</p>
                  <img src="/assets/arrow-up.png" className="w-3 h-3" alt="" aria-hidden="true" />
                </a>
              </div>
              <code className="text-sm text-neutral-300 bg-black/50 border border-neutral-700 rounded px-3 py-2 w-fit">
                pip install cpomdp
              </code>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tools;
