import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkRemoveComments from "remark-remove-comments";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import "katex/dist/katex.min.css";
import { Link } from "react-router-dom";
import Navbar from "../sections/Navbar";
import SlideCarousel from "./SlideCarousel";
import { navLinks } from "../constants";

type BlogPostProps = {
  markdown: string;
  slug: string;
  loading: boolean;
  error: string;
};

const slideDecks: Record<string, { basePath: string; count: number; title: string; description?: string }> = {
  "active-inference": {
    basePath: "/blog/presentations/active_inference_complete_presentation",
    count: 17,
    title: "Active Inference Presentation",
    description: "Navigate the exported slides below.",
  },
};

const BlogPost = ({ markdown, slug, loading, error }: BlogPostProps) => {
  return (
    <>
      <Navbar navLinks={navLinks} />
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
        <Link to="/blog" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
          ← Back to Blog
        </Link>
        {loading && <p className="text-white">Loading...</p>}
        {error && <p className="text-red-400">{error}</p>}
        {!loading && !error && (
          <section className="grid-container w-full max-w-full mx-auto">
            <div className="text-white w-full">
              <ReactMarkdown
                remarkPlugins={[remarkFrontmatter, remarkRemoveComments, remarkGfm, remarkMath]}
                rehypePlugins={[rehypeRaw, rehypeSlug, rehypeKatex]}
                components={{
                  h1: ({ children, id }) => (
                    <h1 id={id} className="clear-both scroll-mt-28 text-3xl font-bold mb-4 text-blue-400">
                      {children}
                    </h1>
                  ),
                  h2: ({ children, id }) => (
                    <h2 id={id} className="clear-both scroll-mt-28 text-2xl font-semibold mb-3 mt-6 text-blue-400">
                      {children}
                    </h2>
                  ),
                  h3: ({ children, id }) => (
                    <h3 id={id} className="clear-both scroll-mt-28 text-xl font-semibold mb-2 mt-5 text-blue-400">
                      {children}
                    </h3>
                  ),
                  h4: ({ children, id }) => (
                    <h4 id={id} className="clear-both scroll-mt-28 text-lg font-semibold mb-2 mt-4 text-blue-300">
                      {children}
                    </h4>
                  ),
                  a: ({ children, href }) => {
                    // In-page section jumps (e.g. #2-the-simplest-case) render as an obvious "jump" button.
                    if (href?.startsWith("#")) {
                      return (
                        <a
                          href={href}
                          className="group not-prose my-6 mx-auto flex w-fit items-center gap-2 rounded-lg border border-blue-400/40 bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-300 no-underline transition-colors hover:border-blue-300 hover:bg-blue-400/20 hover:text-blue-200"
                        >
                          {children}
                          <span className="transition-transform group-hover:translate-y-0.5" aria-hidden="true">
                            ↓
                          </span>
                        </a>
                      );
                    }
                    const external = href?.startsWith("http");
                    return (
                      <a
                        href={href}
                        className="text-blue-400 underline underline-offset-2 hover:text-blue-300"
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                      >
                        {children}
                      </a>
                    );
                  },
                  p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
                  img: ({ src, alt }) => (
                    <img src={src} alt={alt} className="my-6 mx-auto block h-auto max-w-full rounded" />
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="my-4 rounded-r border-l-4 border-blue-400/60 bg-blue-400/5 py-3 pl-4 pr-3 text-gray-300 [&>*:last-child]:mb-0">
                      {children}
                    </blockquote>
                  ),
                  aside: ({ children }) => (
                    <aside className="not-prose my-4 rounded-xl border border-blue-400/30 bg-blue-400/10 p-4 text-sm text-gray-300 sm:float-right sm:ml-6 sm:mb-3 sm:w-80 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_ul]:mb-0 [&_li]:mb-1">
                      {children}
                    </aside>
                  ),
                  ul: ({ children }) => <ul className="list-disc list-inside mb-4">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside mb-4">{children}</ol>,
                  li: ({ children }) => <li className="mb-2 [&>p]:mb-0 [&>p]:inline">{children}</li>,
                  code: ({ children }) => <code className="bg-gray-800 px-2 py-1 rounded">{children}</code>,
                  pre: ({ children }) => <pre className="bg-gray-800 p-4 rounded mb-4 overflow-x-auto">{children}</pre>,
                  details: ({ children }) => (
                    <details className="mb-4 border border-gray-700 rounded p-3">{children}</details>
                  ),
                  summary: ({ children }) => (
                    <summary className="cursor-pointer font-semibold text-blue-400 [&>p]:mb-0 [&>p]:inline">
                      {children}
                    </summary>
                  ),
                }}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          </section>
        )}
        {slug && slideDecks[slug] && (
          <section className="grid-container w-full max-w-full mx-auto mt-8">
            <SlideCarousel slideCount={slideDecks[slug].count} {...slideDecks[slug]} />
          </section>
        )}
      </div>
    </>
  );
};

export default BlogPost;
