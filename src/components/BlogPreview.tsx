import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { BlogPostMeta } from "./BlogList";

const BlogPreview = () => {
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/blog/posts.json")
      .then((r) => {
        if (!r.ok) throw new Error("missing");
        return r.json();
      })
      .then((data: BlogPostMeta[]) => setPosts(data.slice(0, 2)))
      .catch(() => setError(true));
  }, []);

  return (
    <div className="flex flex-col h-full gap-4">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">More than a portfolio</p>
        <p className="grid-headtext mt-2">From the Blog</p>
        <p className="grid-subtext">
          Short essays on what I am learning, building, and curious about.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {error || posts.length === 0
          ? Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-4 animate-pulse min-h-[80px]"
              />
            ))
          : posts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="rounded-lg border border-white/10 bg-white/[0.03] hover:border-blue-400/60 hover:bg-white/[0.06] transition-colors p-4"
              >
                <p className="text-blue-300 font-medium">{post.title}</p>
                {post.summary && (
                  <p className="text-neutral-400 text-sm mt-2">{post.summary}</p>
                )}
              </Link>
            ))}
      </div>

      <Link
        to="/blog"
        className="self-start mt-auto text-sm text-blue-300 hover:text-blue-200 transition-colors"
      >
        Read all posts →
      </Link>
    </div>
  );
};

export default BlogPreview;
