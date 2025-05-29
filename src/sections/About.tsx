import Globe from "react-globe.gl";

const About = () => {
  return (
    <section className="c-space my-20 ">
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
            <img src="assets/grid2.png" alt="grid-2" className="w-full sm:w-[276px] h-fit object-contain" />
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
