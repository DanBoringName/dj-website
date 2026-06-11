// Post-build prerender for GitHub Pages.
//
// Vite emits a single dist/index.html, so on GitHub Pages every deep link
// (e.g. /blog/derive-vfe) is served by 404.html with an HTTP 404 status —
// which search engines refuse to index. This script writes a real HTML file
// for every route, with route-specific <title>/meta/Open Graph tags (and
// JSON-LD for blog posts) injected into the <!-- seo:start/end --> block,
// and generates sitemap.xml.
//
// Route metadata lives in src/constants/pageMeta.json (shared with the
// usePageMeta hook); blog routes are derived from public/blog/posts.json.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = join(root, "dist");

const pageMeta = JSON.parse(readFileSync(join(root, "src/constants/pageMeta.json"), "utf8"));
const posts = JSON.parse(readFileSync(join(root, "public/blog/posts.json"), "utf8"));

const { siteUrl, siteName, author, ogImage } = pageMeta;

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

const template = readFileSync(join(dist, "index.html"), "utf8");
const seoPattern = /<!-- seo:start[^>]*-->[\s\S]*?<!-- seo:end -->/;
if (!seoPattern.test(template)) {
  throw new Error("index.html is missing the <!-- seo:start/end --> block");
}

for (const route of routes) {
  const html = template.replace(seoPattern, seoBlock(route));
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

console.log(`Prerendered ${routes.length} routes and sitemap.xml into dist/`);
