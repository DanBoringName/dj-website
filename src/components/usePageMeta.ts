import { useEffect } from "react";
import pageMeta from "../constants/pageMeta.json";

const set = (selector: string, attr: string, value: string) => {
  document.head.querySelector(selector)?.setAttribute(attr, value);
};

// Keeps the document head in sync on client-side navigations. Crawlers and
// social scrapers never see this — they get the per-route tags baked into the
// prerendered HTML by scripts/prerender.mjs.
const usePageMeta = (title: string, description?: string) => {
  useEffect(() => {
    document.title = title;
    set('meta[property="og:title"]', "content", title);
    const url = pageMeta.siteUrl + window.location.pathname;
    set('link[rel="canonical"]', "href", url);
    set('meta[property="og:url"]', "content", url);
    if (description) {
      set('meta[name="description"]', "content", description);
      set('meta[property="og:description"]', "content", description);
    }
  }, [title, description]);
};

export default usePageMeta;
