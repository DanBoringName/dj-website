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
    name: "Blog",
    href: "/blog",
  },
  {
    id: 3,
    name: "Tools",
    href: "/tools",
  },
  {
    id: 4,
    name: "Publications",
    href: "/#publications",
  },
];

export const clientReviews = [{}, {}, {}, {}];

export type ProjectTag = { path: string; name: string };

export type Project = {
  title: string;
  desc: string;
  subdesc: string;
  href: string;
  hrefLabel?: string;
  sourceHref?: string;
  packageHref?: string;
  packageLabel?: string;
  texture?: string;
  logo?: string;
  logoStyle?: Record<string, string>;
  spotlight?: string;
  /** Plain-English bullet points shown under the description. */
  features?: string[];
  tags: ProjectTag[];
  isLive?: boolean;
};

export const myProjects: Project[] = [
  {
    title: "dj-elliott.com (this very site)",
    desc: "The personal site you are currently looking at.",
    subdesc:
      "Mostly an excuse to crack on with Three.js properly. The hero is a black hole largely because I wrote my dissertation on solving Einstein's field equations to calculate black hole orbits, the tech wheel rotates because it felt like a good idea, and the rest is held together with TypeScript, React, Vite and Tailwind. CI deploys it to GitHub Pages with per-route prerendering for SEO. Still very much a WIP - bits get reworked when I get bored.",
    href: "/",
    sourceHref: "https://github.com/DanBoringName/dj-website",
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
    title: "cpomdp — continuous active inference",
    desc: "Continuous active inference for Python — the continuous-state sibling of pymdp.",
    subdesc:
      "pymdp is brilliant for discrete models but has nothing for continuous ones. cpomdp fills that gap: describe how the world moves and what you can see of it, and you get an agent that works out where things are and what to do about it, through the same infer_states / sample_action loop pymdp users already know. v0.4.4, pre-alpha and solo-built. In plain terms, it can:",
    features: [
      "Track continuous things. Positions, velocities, temperatures - quantities that don't come in neat categories.",
      "Perceive exactly. Observations are folded in with a Kalman filter, so there is no sampling and no approximation to tune.",
      "Reach a goal. Give it a target and it steers there with the provably best action for a linear-Gaussian world (LQR).",
      "Be curious. Sensors and dynamics whose noise depends on where you are, so the agent is drawn towards places it can see more clearly - something the textbook linear-Gaussian model rules out.",
      "Plan ahead. Expected free energy over multi-step horizons, plus an exhaustive search over every plan that hands back a certificate saying it checked them all.",
      "Just watch. Leave out the controls and it becomes a pure tracker.",
      "Handle branching worlds. Coupling graphs for hidden contexts that a single flat filter can't represent.",
      "Check itself. Probe whether a sensor actually earns its keep, and confirm a rollout stayed numerically well conditioned.",
      "Swap engines. A fast JAX backend by default, and an optional Julia (RxInfer) backend used as an independent oracle to check the maths.",
      "Feel like pymdp. Same Agent, qs, infer_states and sample_action names, so existing code translates almost line for line.",
      "Be trusted. Fully typed, documented with guides and an examples gallery, tested on Python 3.11 to 3.14 in CI, Zenodo DOI, MIT licensed.",
    ],
    href: "https://cpomdp.inferogenesis.com/",
    hrefLabel: "Read the docs",
    sourceHref: "https://github.com/inferogenesis/cpomdp",
    packageHref: "https://pypi.org/project/cpomdp/",
    packageLabel: "cpomdp on PyPI",
    texture: "/textures/project/cpomdp_bacillus.mp4",
    spotlight: "/assets/spotlight2.png",
    tags: [{ path: "/assets/python.svg", name: "Python" }],
  },
  {
    title: "Hestia",
    desc: "A debate platform built as a TypeScript monorepo.",
    subdesc:
      "Hexagonal architecture (ports and adapters) end to end, with the domain logic kept independent of framework and infrastructure. The most conventionally engineered thing I own — built to practise the architecture properly rather than to ship fast.",
    href: "",
    sourceHref: "https://github.com/DanBoringName/hestia",
    spotlight: "/assets/spotlight1.png",
    tags: [{ path: "/assets/typescript.png", name: "TypeScript" }],
  },
  {
    title: "Discord-bot WIP",
    desc: "An AI integrated discord bot built in Rust",
    subdesc:
      "Research is still being done on the scope of this. The aim is to create a bot useful for any tabletop situation, from asking the bot to create a quick image from your description to highlighting key parts of a conversation.",
    href: "/discordbot",
    texture: "/textures/project/bot_demo_june.mp4",
    logo: "/assets/project-logo1.png",
    logoStyle: {},
    spotlight: "/assets/spotlight2.png",
    tags: [],
  },
];

export type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: number;
  /** One or two sentences on what the paper shows, in plain terms. */
  summary: string;
  arxivId: string;
  doi: string;
  /** Optional link to the project the paper underpins. */
  related?: { label: string; href: string };
};

export const publications: Publication[] = [
  {
    title: "State-dependent observation noise reintroduces epistemic value in linear-Gaussian active inference",
    authors: "Dan Corva",
    venue: "arXiv preprint, q-bio.NC",
    year: 2026,
    summary:
      "In the textbook linear-Gaussian setting an active inference agent cannot be curious: the information-seeking part of expected free energy works out the same for every plan, so it never changes a decision. This paper shows that letting the sensor noise depend on where the agent is, while keeping everything else linear, is enough to bring that term back to life. Curiosity returns in a regime where it had been proved away, and the result is what cpomdp is built on.",
    arxivId: "2607.20306",
    doi: "10.48550/arXiv.2607.20306",
    related: { label: "Implemented in cpomdp", href: "https://cpomdp.inferogenesis.com/" },
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
