import { useState } from "react";

type Technology = {
  name: string;
  slug: string;
  description: string;
  /** Override for the icon URL when Simple Icons doesn't carry the slug. */
  iconUrl?: string;
};

const technologies: Technology[] = [
  {
    name: "TypeScript",
    slug: "typescript",
    description: "My favourite language. Where possible I will use Typescript for any frontend business.",
  },
  {
    name: "React",
    slug: "react",
    description:
      "Component-driven UIs. This site and others I have build have mostly came with React. This is the first time I have integrated React with Three.js for style.",
  },
  {
    name: "Vite",
    slug: "vite",
    description: "If you know what React is and build frontends but don't know what vite is I am confused.",
  },
  {
    name: "Python",
    slug: "python",
    description:
      "Python has always been my backend go to, a quick language to template and prototype. Python and I have our difference, I largely hate it if I'm being honest, but that comes from its flexible nature and the miraculous ways people many to hold a project up with duct tape, itching to fall over. I am currently using Python to build an Active Inference Passive Observer Markov Decision Process (POMDP) and have previously trained smaller conventional aI models using reinforcement learning and my personal hardware. If I ever build a backend for this website it will most likely be in Python",
  },
  {
    name: "FastAPI",
    slug: "fastapi",
    description:
      "For those projects I have worked on that require a front and backend FastAPI is my go to. It provides, async Python APIs and has been used for the JSON layer behind a few of my larger projects.",
  },
  {
    name: "Three.js",
    slug: "threedotjs",
    description: "Drives the 3D bits of this site - the hero scene, the globe, and assorted shader experiments.",
  },
  {
    name: "Godot",
    slug: "godotengine",
    description:
      "Where I prototype game ideas and play with real-time interactive systems. Still a rookie here but slowly making progress on a solo developed game.",
  },
  {
    name: "Rust",
    slug: "rust",
    description:
      "Go to for when I want performance and compile-time guarantees. My Discord bot project lives here, integrating an LLM into discords chat window for ease of research and conversation. Project largely abandoned for now as it was just a prototype.",
  },
  {
    name: "Tokio",
    slug: "tokio",
    description:
      "Async runtime powering the Rust Discord bot I write. One of the more difficult things I've had to content with in my software engineering career.",
  },
  {
    name: "C++",
    slug: "cplusplus",
    description:
      "Where I first learned to care about memory, ownership, and what the machine is actually doing. Still hate it though and will avoid all C languages like the plague.",
  },
  {
    name: "PostgreSQL",
    slug: "postgresql",
    description:
      "My default relational database. Reliable, expressive SQL, mostly used for vector databases when training my reinforcement learning models.",
  },
  {
    name: "MinIO",
    slug: "minio",
    description:
      "If you don't know what minIO is it is a self-hosted, S3-compatible object storage for media, backups, and project artifacts. A cheaper AWS S3 alternative.",
  },
  {
    name: "AWS",
    slug: "amazonwebservices",
    // Simple Icons dropped the AWS mark over trademark policy; pull a white copy from Iconify instead.
    iconUrl: "https://api.iconify.design/simple-icons/amazonaws.svg?color=%23ffffff",
    description:
      "Too complicated to explain but the tag line is Cloud infrastructure for deploying services, storage, and networking - usually provisioned via Terraform. I have had to become accustom to AWS over my career from S3s to EC2s to Lambdas to Terraform etc.. Extremely powerful cloud hosted services.",
  },
  {
    name: "Terraform",
    slug: "terraform",
    description: "Infrastructure as code. Used in partnership with my AWS and Kubernetes projects.",
  },
  {
    name: "Apache",
    slug: "apache",
    description:
      "My original host for my website that provides reverse proxies and static hosting. Relatively simple to use and provides a lot of flexibility",
  },
];

const RADIUS = 100;
const ICON_BUTTON_SIZE = 40;
const ANGLE_STEP = 360 / technologies.length;

const TechWheel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [failedIcons, setFailedIcons] = useState<Set<string>>(new Set());

  const selectTech = (newIndex: number) => {
    if (newIndex === selectedIndex) return;
    const currentTarget = -selectedIndex * ANGLE_STEP;
    const newTarget = -newIndex * ANGLE_STEP;
    let delta = newTarget - currentTarget;
    while (delta > 180) delta -= 360;
    while (delta < -180) delta += 360;
    setRotation((r) => r + delta);
    setSelectedIndex(newIndex);
  };

  const selected = technologies[selectedIndex];

  return (
    <div className="flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-8">
      <div className="relative w-full max-w-[260px] aspect-square shrink-0">
        {technologies.map((tech, i) => {
          const totalAngle = i * ANGLE_STEP + rotation;
          const isSelected = i === selectedIndex;
          const hasFailed = failedIcons.has(tech.slug);
          return (
            <button
              key={tech.slug}
              type="button"
              onClick={() => selectTech(i)}
              aria-label={tech.name}
              title={tech.name}
              className={`absolute top-1/2 left-1/2 rounded-full flex items-center justify-center backdrop-blur-lg border cursor-pointer hover:bg-neutral-100/20 ${
                isSelected
                  ? "border-white/80 bg-neutral-100/20 shadow-[0_0_14px_rgba(255,255,255,0.35)]"
                  : "border-white/10 bg-neutral-100/10"
              }`}
              style={{
                width: ICON_BUTTON_SIZE,
                height: ICON_BUTTON_SIZE,
                transform: `translate(-50%, -50%) rotate(${totalAngle}deg) translateX(${RADIUS}px) rotate(${-totalAngle}deg)`,
                transition:
                  "transform 700ms cubic-bezier(0.4, 0, 0.2, 1), border-color 300ms ease, background-color 300ms ease, box-shadow 300ms ease",
              }}
            >
              {hasFailed ? (
                <span className="text-[10px] font-semibold text-white">
                  {tech.name
                    .replace(/[^A-Za-z0-9]/g, "")
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
              ) : (
                <img
                  src={tech.iconUrl ?? `https://cdn.simpleicons.org/${tech.slug}/white`}
                  alt=""
                  aria-hidden="true"
                  className="w-5 h-5 object-contain"
                  onError={() =>
                    setFailedIcons((prev) => {
                      const next = new Set(prev);
                      next.add(tech.slug);
                      return next;
                    })
                  }
                />
              )}
            </button>
          );
        })}

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/60 border border-white/15 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-white/80" />
        </div>

        <div
          className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ left: `calc(50% + ${RADIUS + ICON_BUTTON_SIZE / 2 + 4}px)` }}
          aria-hidden="true"
        >
          <div className="w-0 h-0 border-y-[6px] border-y-transparent border-r-[8px] border-r-white/70" />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center text-center md:text-left min-h-[120px]">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Tech Stack</p>
        <p className="grid-headtext mt-2 text-2xl">{selected.name}</p>
        <p className="grid-subtext mt-2">{selected.description}</p>
      </div>
    </div>
  );
};

export default TechWheel;
