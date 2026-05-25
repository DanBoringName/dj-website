import TechWheel from "../components/TechWheel";
import BlogPreview from "../components/BlogPreview";
import DevLogs from "./DevLogs";

const About = () => {
  return (
    <section className="c-space my-20" id="about">
      <div className="grid xl:grid-cols-3 grid-cols-1 gap-5 h-full">
        <div className="col-span-1">
          <div className="grid-container">
            <img src="/assets/grid1.png" alt="grid-1" className="w-full sm:h-[276px] h-fit object-contain" />
            <div>
              <p className="grid-headtext">Hi, I'm Dan</p>
              <p className="grid-subtext">
                With 2 1/2 years of coding experience, I finally decided to crack on with making my own site with a
                focus on something animated & 3D
              </p>
            </div>
          </div>
        </div>

        <div className="xl:col-span-2">
          <div className="grid-container justify-center">
            <TechWheel />
          </div>
        </div>

        <div className="xl:col-span-2">
          <div className="grid-container">
            <BlogPreview />
          </div>
        </div>

        <div className="col-span-1">
          <div className="grid-container">
            <DevLogs />
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
