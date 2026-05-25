import { useState } from "react";

type Technology = {
  name: string;
  slug: string;
  description: string;
};

const technologies: Technology[] = [
  {
    name: "TypeScript",
    slug: "typescript",
    description: "My default language for the web - including this site. Types catch the silly mistakes I would otherwise ship.",
  },
  {
    name: "React",
    slug: "react",
    description: "Component-driven UIs. The site you are scrolling through right now is a React app.",
  },
  {
    name: "Vite",
    slug: "vite",
    description: "Fast dev server and build tool for every modern front-end project I start.",
  },
  {
    name: "Python",
    slug: "python",
    description: "My go-to for scripting, data wrangling, and most back-end services I have written.",
  },
  {
    name: "FastAPI",
    slug: "fastapi",
    description: "Typed, async Python APIs with docs that generate themselves. Used for the JSON layer behind a few side projects.",
  },
  {
    name: "Three.js",
    slug: "threedotjs",
    description: "Drives the 3D bits of this site - the hero scene, the globe, and assorted shader experiments.",
  },
  {
    name: "Godot",
    slug: "godotengine",
    description: "Where I prototype game ideas and play with real-time interactive systems.",
  },
  {
    name: "Rust",
    slug: "rust",
    description: "Reach for it when I want performance and compile-time guarantees. The Discord bot project lives here.",
  },
  {
    name: "Tokio",
    slug: "tokio",
    description: "Async runtime powering the Rust services I write - concurrent network code without giving up safety.",
  },
  {
    name: "C++",
    slug: "cplusplus",
    description: "Where I first learned to care about memory, ownership, and what the machine is actually doing.",
  },
  {
    name: "PostgreSQL",
    slug: "postgresql",
    description: "My default relational database. Reliable, expressive SQL, and a feature set that keeps surprising me.",
  },
  {
    name: "MinIO",
    slug: "minio",
    description: "Self-hosted, S3-compatible object storage for media, backups, and project artifacts.",
  },
  {
    name: "AWS",
    slug: "amazonwebservices",
    description: "Cloud infrastructure for deploying services, storage, and networking - usually provisioned via Terraform.",
  },
  {
    name: "Terraform",
    slug: "terraform",
    description: "Infrastructure as code. I treat my cloud setups as commits, not clicks.",
  },
  {
    name: "Cloudflare",
    slug: "cloudflare",
    description: "DNS, CDN, and edge tooling sitting in front of most of my deployments.",
  },
  {
    name: "Apache",
    slug: "apache",
    description: "Reverse proxies and static hosting for the more traditional parts of the stack.",
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
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-full max-w-[280px] aspect-square">
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
                  {tech.name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase()}
                </span>
              ) : (
                <img
                  src={`https://cdn.simpleicons.org/${tech.slug}/white`}
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

      <div className="text-center min-h-[88px]">
        <p className="grid-headtext">{selected.name}</p>
        <p className="grid-subtext">{selected.description}</p>
      </div>
    </div>
  );
};

export default TechWheel;
