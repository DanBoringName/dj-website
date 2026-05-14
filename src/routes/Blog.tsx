import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../sections/Navbar";
import SlideCarousel from "../components/SlideCarousel";
import { navLinks } from "../constants";

const Blog = () => {
  const slideDecks: Record<string, { basePath: string; count: number; title: string; description?: string }> = {
    "active-inference": {
      basePath: "/blog/presentations/active_inference_complete_presentation",
      count: 17,
      title: "Active Inference Presentation",
      description: "Navigate the exported slides below.",
    },
  };
  const { slug } = useParams();
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState<{ slug: string; title: string }[]>([]);

  // List of post slugs - add new slugs here as you create .md files
  const postSlugs = ["active-inference", "mcp"];

  // Function to extract title from markdown content
  const extractTitle = (content: string): string => {
    const lines = content.split("\n");
    for (const line of lines) {
      if (line.startsWith("# ")) {
        return line.substring(2).trim();
      }
    }
    return "Untitled Post";
  };

  useEffect(() => {
    if (slug) {
      setLoading(true);
      setError("");
      fetch(`/blog/${slug}.md`)
        .then((response) => {
          if (!response.ok) throw new Error("Post not found");
          return response.text();
        })
        .then((text) => {
          setMarkdown(text);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      // Load posts for index
      const loadPosts = async () => {
        const loadedPosts: { slug: string; title: string }[] = [];
        for (const slug of postSlugs) {
          try {
            const response = await fetch(`/blog/${slug}.md`);
            if (response.ok) {
              const text = await response.text();
              const title = extractTitle(text);
              loadedPosts.push({ slug, title });
            }
          } catch (error) {
            console.error(`Error loading ${slug}:`, error);
          }
        }
        setPosts(loadedPosts);
      };
      loadPosts();
    }
  }, [slug]);

  if (slug) {
    // Individual post page
    return (
      <>
        <Navbar navLinks={navLinks} />
        <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
          <Link to="/blog" className="text-blue-400 hover:text-blue-300 mb-4">
            ← Back to Blog
          </Link>
          {loading && <p className="text-white">Loading...</p>}
          {error && <p className="text-red-400">{error}</p>}
          {!loading && !error && (
            <section className="grid-container w-full max-w-full mx-auto">
              <div className="text-white w-full">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-2xl font-semibold mb-3 mt-6">{children}</h2>,
                    p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc list-inside mb-4">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal list-inside mb-4">{children}</ol>,
                    li: ({ children }) => <li className="mb-2">{children}</li>,
                    code: ({ children }) => <code className="bg-gray-800 px-2 py-1 rounded">{children}</code>,
                    pre: ({ children }) => (
                      <pre className="bg-gray-800 p-4 rounded mb-4 overflow-x-auto">{children}</pre>
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
              <SlideCarousel slideCount={17} {...slideDecks[slug]} />
            </section>
          )}
        </div>
      </>
    );
  }

  // Blog index page
  return (
    <>
      <Navbar navLinks={navLinks} />
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
        <h1 className="sm:text-4xl text-2xl font-bold text-white text-center font-sans">My Blog</h1>
        <div className="text-white w-full max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <p>Loading posts...</p>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <section key={post.slug} className="grid-container w-full max-w-full border border-gray-700">
                  <h2 className="text-2xl font-semibold mb-2 text-blue-400">
                    <Link to={`/blog/${post.slug}`} className="hover:text-blue-300">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-300">Click to read more...</p>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;
