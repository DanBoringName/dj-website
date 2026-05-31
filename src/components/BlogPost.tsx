import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkRemoveComments from "remark-remove-comments";
import rehypeKatex from "rehype-katex";
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
                rehypePlugins={[rehypeKatex]}
                components={{
                  h1: ({ children }) => <h1 className="text-3xl font-bold mb-4 text-blue-400">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-2xl font-semibold mb-3 mt-6 text-blue-400">{children}</h2>,
                  p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-inside mb-4">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside mb-4">{children}</ol>,
                  li: ({ children }) => <li className="mb-2">{children}</li>,
                  code: ({ children }) => <code className="bg-gray-800 px-2 py-1 rounded">{children}</code>,
                  pre: ({ children }) => <pre className="bg-gray-800 p-4 rounded mb-4 overflow-x-auto">{children}</pre>,
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
