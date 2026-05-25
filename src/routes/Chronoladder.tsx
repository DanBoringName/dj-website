import type { NavLink } from "../constants";
import Navbar from "../sections/Navbar";

const Chronoladder = () => {
  //TODO: Rethink nav structure
  const navLinks: NavLink[] = [
    {
      id: 1,
      name: "Home",
      href: "/",
    },
  ];

  return (
    <>
      <Navbar navLinks={navLinks} />
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
        <p className="sm:text-3xl text-xl font-medium text-white text-center font-sans">
          Welcome to the creative writing page <span className="waving-hand">🤖</span>
        </p>
      </div>
      <div className="grid-cols-1 gap-5 h-full">
        <div className="col-span-1 xl:row-span-3 ">
          <div className="grid-container">
            <div>
              <p className="grid-headtext">2025 - Changes</p>
              <p className="grid-subtext p-2">
                Still conducting research. Trying to find a compelling settings where a pseudo-theistic hierarchy orbits
                a black hole, using time dilation as their hierarchical crux
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chronoladder;
