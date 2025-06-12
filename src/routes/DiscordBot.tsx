import { navLinks, type NavLink } from "../constants";
import DevLogs from "../sections/DevLogs";
import Navbar from "../sections/Navbar";

const Discordbot = () => {
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
          Welcome to the discord bot page <span className="waving-hand">🤖</span>
        </p>
      </div>
      <DevLogs />
    </>
  );
};

export default Discordbot;
