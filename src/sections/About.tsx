import Globe from "react-globe.gl";
import Button from "../components/Button";
import { useState } from "react";
import CopyTick from "../components/CopyTick";

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText("placeholder_email@dj-elliott.com");
    setHasCopied(true);
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <section className="c-space my-20" id="about">
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-col-2 grid-cols-1 gap-5 h-full ">
        <div className="col-span-1 xl:row-span-3 ">
          <div className="grid-container">
            <img src="/assets/grid1.png" alt="grid-1" className="w-full sm:h-[276pz] h-fit object-contain" />
            <div>
              <p className="grid-headtext">Hi, I'm Dan</p>
              <p className="grid-subtext">
                With 2 1/2 years of coding experience, I finally decided to crack on with making my own site with a
                focus on something animated & 3D
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img src="/assets/grid2.png" alt="grid-2" className="w-full sm:w-[276px] h-fit object-contain" />
            {/* //placeholder replace with actual image */}
            <div>
              <p className="grid-headtext">Tech Stack</p>
              <p className="grid-subtext">
                I use a variety of technologies to build my projects, including React, Python, Three.js, and Tailwind
                CSS.
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-1 xl:row-span-4">
          <div className="grid-container">
            <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
              <Globe
                height={326}
                width={326}
                backgroundColor="rgba(0,0,0,0)"
                showAtmosphere
                showGraticules
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
              />
            </div>
            <div className="grid-headtext">
              <p>location placeholder</p>
              <p className="grid-subtext">More placeholder</p>
              <Button name="I do nothing yet" isBeam containerClass="w-full mt-10" /> {/* TODO: Placeholder button */}
            </div>
          </div>
        </div>
        <div className="xl:col-span-2 xl:row-span-3">
          <div className="grid-container">
            <img src="/assets/grid3.png" alt="grid-3" className="w-full sm:h-[266px] h-fit object-contain" />
            <div>
              <p className="grid-headtext">
                My passion lies in creating immersive experiences that captivate and engage users.
              </p>
              <p className="grid-subtext">
                Creative problem solving can be applied outside of software dev. I have only just discovered that.
              </p>
            </div>
          </div>
        </div>
        <div className="xl:col-span-1 xl:row-span-2">
          <div className="grid-container">
            <img
              src="/assets/grid4.png"
              alt="grid-4"
              className="w-full md:h-[496px] sm:h-[276px] h-fit object-cover sm:object-top"
            />
            <div className="space-y-2">
              <p className="grid-subtext text-center">Contact Me</p>
              <div className="copy-container align-middle" onClick={handleCopy}>
                <CopyTick hasCopied={hasCopied} />
                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">
                  placeholder_email@dj-elliott.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
