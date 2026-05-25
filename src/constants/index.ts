import { Vector3 } from "three";

export type NavLink = {
  id: number;
  name: string;
  href: string;
};

export const navLinks = [
  {
    id: 1,
    name: "Home",
    href: "/#home",
  },
  {
    id: 2,
    name: "About",
    href: "/#about",
  },
  {
    id: 3,
    name: "Projects",
    href: "/#projects",
  },
  {
    id: 4,
    name: "Contact",
    href: "/#contact",
  },
  {
    id: 5,
    name: "Blog",
    href: "/blog",
  },
];

export const clientReviews = [{}, {}, {}, {}];

export type ProjectTag = { path: string; name: string };

export type Project = {
  title: string;
  desc: string;
  subdesc: string;
  href: string;
  texture?: string;
  logo?: string;
  logoStyle?: Record<string, string>;
  spotlight?: string;
  tags: ProjectTag[];
  isLive?: boolean;
};

export const myProjects: Project[] = [
  {
    title: "dj-elliott.com (this very site)",
    desc: "The personal site you are currently looking at.",
    subdesc:
      "Mostly an excuse to crack on with Three.js properly. The hero is a black hole largely because I wrote my dissertation on solving Einstein's field equations to calculate black hole orbits, the tech wheel rotates because it felt like a good idea, and the rest is held together with TypeScript, React, Vite and Tailwind. Still very much a WIP - bits get reworked when I get bored.",
    href: "/",
    texture: "/textures/project/dj-website.mp4",
    logo: "/assets/dj-elliott_website_logo.png",
    logoStyle: {},
    spotlight: "/assets/spotlight1.png",
    tags: [
      { path: "/assets/react.svg", name: "React" },
      { path: "/assets/typescript.png", name: "TypeScript" },
      { path: "/assets/tailwindcss.png", name: "Tailwind" },
    ],
    isLive: true,
  },
  {
    title: "Discord-bot WIP",
    desc: "An AI integrated discord bot built in Rust",
    subdesc:
      "Research is still being done on the scope of this. The aim is to create a bot useful for any tabletop situation, from asking the bot to create a quick image from your description to highlighting key parts of a conversation.",
    href: "discordbot/",
    texture: "/textures/project/bot_demo_june.mp4",
    logo: "/assets/project-logo1.png",
    logoStyle: {},
    spotlight: "/assets/spotlight2.png",
    tags: [],
  },
  {
    title: "Active Inference Agent",
    desc: "A project exploring active inference agents currently built on pymdp and JAX.",
    subdesc: "",
    href: "",
    spotlight: "/assets/spotlight2.png",
    tags: [],
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
