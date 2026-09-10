// Post-build prerender for GitHub Pages.
//
// Vite emits a single dist/index.html, so on GitHub Pages every deep link
// (e.g. /blog/derive-vfe) is served by 404.html with an HTTP 404 status —
// which search engines refuse to index. This script writes a real HTML file
// for every route, with route-specific <title>/meta/Open Graph tags (and
// JSON-LD for blog posts) injected into the <!-- seo:start/end --> block,
// and generates sitemap.xml.
//
// It also writes a static snapshot of each route's content into the root
// element. Crawlers that don't wait for the JavaScript bundle see real text
// instead of an empty <div id="root">; React's createRoot clears the
// container on its first render, so the snapshot never coexists with the app.
//
// Route metadata lives in src/constants/pageMeta.json (shared with the
// usePageMeta hook); blog routes are derived from public/blog/posts.json;
// the project, publication and copy strings come from src/constants/index.ts,
// bundled with esbuild so there is one copy of that content.

import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "esbuild";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkRemoveComments from "remark-remove-comments";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = join(root, "dist");

const pageMeta = JSON.parse(readFileSync(join(root, "src/constants/pageMeta.json"), "utf8"));
const posts = JSON.parse(readFileSync(join(root, "public/blog/posts.json"), "utf8"));

const { siteUrl, siteName, author, ogImage } = pageMeta;

// --- site constants (projects, publications, copy), bundled from the TS source ---
// Written under dist/ (not the OS temp dir) so the external `three` import resolves from node_modules.
const constantsBundle = join(dist, ".constants.prerender.mjs");
await build({
  entryPoints: [join(root, "src/constants/index.ts")],
  bundle: true,
  format: "esm",
  platform: "node",
  external: ["three"],
  outfile: constantsBundle,
  logLevel: "silent",
});
const constants = await import(pathToFileURL(constantsBundle).href);
rmSync(constantsBundle, { force: true });

const routes = [
  ...Object.entries(pageMeta.routes).map(([path, meta]) => ({
    path,
    ...meta,
  })),
  ...posts.map((post) => ({
    path: `/blog/${post.slug}`,
    title: `${post.title} — ${siteName}`,
    description: post.summary,
    post,
  })),
];

const escapeHtml = (s) =>
  s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

const seoBlock = ({ path, title, description, post }) => {
  const url = siteUrl + path;
  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${post ? "article" : "website"}" />`,
    `<meta property="og:site_name" content="${escapeHtml(siteName)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${siteUrl + ogImage}" />`,
    `<meta name="twitter:card" content="summary" />`,
  ];
  if (post) {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.summary,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      author: { "@type": "Person", name: author, url: siteUrl },
      mainEntityOfPage: url,
      image: siteUrl + ogImage,
    };
    tags.push(`<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`);
  }
  return tags.join("\n    ");
};

// --- body snapshots -----------------------------------------------------------

const markdownProcessor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(remarkRemoveComments)
  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeSlug)
  .use(rehypeKatex)
  .use(rehypeStringify);

const markdownToHtml = async (markdown) => String(await markdownProcessor.process(markdown));

const a = (href, text) => `<a href="${escapeHtml(href)}">${escapeHtml(text)}</a>`;
const p = (text) => (text ? `<p>${escapeHtml(text)}</p>` : "");
const list = (items) => (items?.length ? `<ul>${items.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul>` : "");

const navHtml = () => `<nav><ul>${constants.navLinks.map((l) => `<li>${a(l.href, l.name)}</li>`).join("")}</ul></nav>`;

const postListHtml = () =>
  `<ul>${posts
    .map((post) => `<li><h3>${a(`/blog/${post.slug}`, post.title)}</h3>${p(post.summary)}</li>`)
    .join("")}</ul>`;

const projectHtml = (project) => {
  const links = [];
  if (project.sourceHref) links.push(a(project.sourceHref, "Source on GitHub"));
  if (project.packageHref) links.push(a(project.packageHref, project.packageLabel ?? "Package"));
  if (project.href && project.href !== "/") links.push(a(project.href, project.hrefLabel ?? "Go to project"));
  return `<article><h3>${escapeHtml(project.title)}</h3>${p(project.desc)}${p(project.subdesc)}${list(
    project.features,
  )}${links.length ? `<p>${links.join(" · ")}</p>` : ""}</article>`;
};

const publicationHtml = (paper) => {
  const links = [
    a(`https://arxiv.org/abs/${paper.arxivId}`, "Read on arXiv"),
    a(`https://arxiv.org/pdf/${paper.arxivId}`, "PDF"),
    a(`https://doi.org/${paper.doi}`, `doi:${paper.doi}`),
  ];
  if (paper.related) links.push(a(paper.related.href, paper.related.label));
  return `<article><h3>${escapeHtml(paper.title)}</h3><p>${escapeHtml(paper.authors)} · ${escapeHtml(
    paper.venue,
  )} · ${paper.year}</p>${p(paper.summary)}<p>${links.join(" · ")}</p></article>`;
};

const homeBody = () => `
<header><h1>${escapeHtml(pageMeta.routes["/"].title)}</h1>${p(constants.heroSubtitle)}</header>
<section id="about"><h2>Hi, I'm Dan</h2>${p(constants.aboutIntro)}</section>
<section id="projects"><h2>My Projects</h2>${constants.myProjects.map(projectHtml).join("")}</section>
<section id="publications"><h2>Publications</h2>${constants.publications.map(publicationHtml).join("")}</section>
<section id="blog"><h2>From the Blog</h2>${postListHtml()}</section>`;

const blogIndexBody = () => `<h1>My Blog</h1>${p(pageMeta.routes["/blog"].description)}${postListHtml()}`;

const blogPostBody = async (post) => {
  const markdown = readFileSync(join(root, "public/blog", `${post.slug}.md`), "utf8");
  return `<p>${a("/blog", "← Back to Blog")}</p><article class="blog-prose">${await markdownToHtml(markdown)}</article>`;
};

const toolsBody = () => {
  const cpomdp = constants.myProjects.find((project) => project.title.startsWith("cpomdp"));
  return `<h1>Tools</h1>${p(pageMeta.routes["/tools"].description)}${cpomdp ? projectHtml(cpomdp) : ""}`;
};

const discordBotBody = () =>
  `<h1>${escapeHtml(pageMeta.routes["/discordbot"].title)}</h1>${p(pageMeta.routes["/discordbot"].description)}`;

const bodyFor = async (route) => {
  if (route.post) return blogPostBody(route.post);
  switch (route.path) {
    case "/":
      return homeBody();
    case "/blog":
      return blogIndexBody();
    case "/tools":
      return toolsBody();
    case "/discordbot":
      return discordBotBody();
    default:
      return "";
  }
};

const snapshot = (inner) =>
  `<div data-prerender class="c-space text-white font-sans" style="padding-top:6rem">${navHtml()}<main>${inner}</main></div>`;

// --- write the files ----------------------------------------------------------

const template = readFileSync(join(dist, "index.html"), "utf8");
const seoPattern = /<!-- seo:start[^>]*-->[\s\S]*?<!-- seo:end -->/;
if (!seoPattern.test(template)) {
  throw new Error("index.html is missing the <!-- seo:start/end --> block");
}
const rootPattern = '<div id="root"></div>';
if (!template.includes(rootPattern)) {
  throw new Error('index.html is missing an empty <div id="root"></div> to snapshot into');
}

for (const route of routes) {
  const html = template
    .replace(seoPattern, seoBlock(route))
    .replace(rootPattern, `<div id="root">${snapshot(await bodyFor(route))}</div>`);
  if (route.path === "/") {
    writeFileSync(join(dist, "index.html"), html);
    continue;
  }
  // Write both forms so GitHub Pages serves /blog/foo and /blog/foo/
  // directly with a 200; the canonical tag points at the extensionless URL.
  writeFileSync(join(dist, `${route.path.slice(1)}.html`), html);
  const dir = join(dist, route.path.slice(1));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => {
    const lastmod = route.post ? `\n    <lastmod>${route.post.updated ?? route.post.date}</lastmod>` : "";
    return `  <url>\n    <loc>${siteUrl + route.path}</loc>${lastmod}\n  </url>`;
  })
  .join("\n")}
</urlset>
`;
writeFileSync(join(dist, "sitemap.xml"), sitemap);

console.log(`Prerendered ${routes.length} routes (with body snapshots) and sitemap.xml into dist/`);
