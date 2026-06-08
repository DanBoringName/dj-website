import { useEffect, useMemo, useRef, useState } from "react";
import GithubSlugger from "github-slugger";

type TocItem = { id: string; text: string; level: number };

function parseHeadings(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inFence = false;

  for (const line of markdown.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (!match) continue;

    const level = match[1].length;
    const text = match[2].trim();
    const id = slugger.slug(text); // consume a slug for every heading to keep counters aligned

    if (level >= 2 && level <= 3) {
      items.push({ id, text, level });
    }
  }

  return items;
}

const TableOfContents = ({ markdown }: { markdown: string }) => {
  const items = useMemo(() => parseHeadings(markdown), [markdown]);
  const [activeId, setActiveId] = useState<string>("");
  const visible = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.current.add(entry.target.id);
          else visible.current.delete(entry.target.id);
        }
        // Active = the topmost (first in document order) heading currently in the
        // detection band. If none, keep the last active so the highlight doesn't
        // flicker off between sections.
        const topmost = items.find((i) => visible.current.has(i.id));
        if (topmost) setActiveId(topmost.id);
      },
      // Band runs from just below the fixed navbar to 65% up from the bottom, so a
      // heading "activates" as it reaches the top of the reading area.
      { rootMargin: "-120px 0px -65% 0px", threshold: 0 },
    );

    const els = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => el !== null);
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  const renderLink = (item: TocItem) => {
    const isActive = item.id === activeId;
    return (
      <li key={item.id}>
        <a
          href={`#${item.id}`}
          className={[
            "block border-l-2 -ml-px py-1 transition-colors",
            item.level === 3 ? "pl-6 text-[0.8rem]" : "pl-3",
            isActive
              ? "border-blue-400 text-blue-300 font-medium"
              : "border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500",
          ].join(" ")}
        >
          {item.text}
        </a>
      </li>
    );
  };

  return (
    <>
      {/* Wide screens: sticky list floated into the empty left gutter */}
      <aside className="hidden xl:block absolute right-full top-0 h-full mr-8 w-56">
        <nav
          aria-label="Table of contents"
          className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 text-sm"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">On this page</p>
          <ul className="border-l border-gray-700">{items.map(renderLink)}</ul>
        </nav>
      </aside>

      {/* Narrow screens: collapsible box at the top of the article */}
      <details className="xl:hidden mb-8 rounded-lg border border-gray-700 bg-white/5 p-4 text-sm">
        <summary className="cursor-pointer font-semibold text-blue-400">On this page</summary>
        <nav aria-label="Table of contents" className="mt-3">
          <ul className="border-l border-gray-700">{items.map(renderLink)}</ul>
        </nav>
      </details>
    </>
  );
};

export default TableOfContents;