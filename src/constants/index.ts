import { Vector3 } from "three";

export const navLinks = [
  {
    id: 1,
    name: "Home",
    href: "#home",
  },
  {
    id: 2,
    name: "About",
    href: "#about",
  },
  {
    id: 3,
    name: "Projects",
    href: "#projects",
  },
  {
    id: 4,
    name: "Contact",
    href: "#contact",
  },
];

export const clientReviews = [{}, {}, {}, {}];

export const myProjects = [
  {
    title: "SciFi book - The Chronoladder WIP",
    desc: "A science fiction book I am writing.",
    subdesc:
      "Set in the orbit of a black hole, time dilation is mirrored in the narrative structure, with characters experiencing time at different rates. The story explores themes of identity, memory, and the nature of reality as characters navigate a universe where time is power and relative.",
    href: "book",
    texture: "", //This is where the screen recorded mp4 will go.
    logo: "/assets/theChronoladder_logo.png",
    logoStyle: {},
    spotlight: "",
    tags: [{ path: "", name: "" }],
  },
  {
    title: "Discord-bot WIP",
    desc: "",
    subdesc: "",
    href: "discordbot/",
    texture: "",
    logo: "",
    logoStyle: {},
    spotlight: "",
    tags: [{ path: "", name: "" }],
  },
  {
    title: "The New Jedi Order SW5E Campaign",
    desc: "",
    subdesc: "",
    href: "",
    texture: "",
    logo: "",
    logoStyle: {},
    spotlight: "",
    tags: [{ path: "", name: "" }],
  },
];

export const calculateSizes = (isSmall: boolean, isMobile: boolean, isTablet: boolean) => {
  return {
    blackholeScale: isSmall ? 1 : isMobile ? 2.5 : 5,
    blackholePosition: isMobile ? new Vector3(0.5, -4.5, 0) : new Vector3(0.25, -5.5, 0), //Probably dont need this
    cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
    reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
    ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
    targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
  };
};

export const workExperiences = [];
