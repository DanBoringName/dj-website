import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../sections/Navbar";
import BlogList from "../components/BlogList";
import type { BlogPostMeta } from "../components/BlogList";
import BlogPost from "../components/BlogPost";
import { navLinks } from "../constants";

const Blog = () => {
  const { slug } = useParams();
  const [markdown, setMarkdown] = useState("");
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    setLoading(true);

    if (slug) {
      fetch(`/blog/${slug}.md`)
        .then((response) => {
          if (!response.ok) throw new Error("Post not found");
          return response.text();
        })
        .then((text) => setMarkdown(text))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    } else {
      fetch("/blog/posts.json")
        .then((response) => {
          if (!response.ok) throw new Error("Post index not found");
          return response.json();
        })
        .then((data) => setPosts(data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [slug]);

  if (slug) {
    return <BlogPost markdown={markdown} slug={slug} loading={loading} error={error} />;
  }

  return (
    <>
      <Navbar navLinks={navLinks} />
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
        <h1 className="sm:text-4xl text-2xl font-bold text-white text-center font-sans">My Blog</h1>
        <div className="text-white w-full max-w-6xl mx-auto">
          {error ? <p className="text-red-400">{error}</p> : <BlogList posts={posts} />}
        </div>
      </div>
    </>
  );
};

export default Blog;
