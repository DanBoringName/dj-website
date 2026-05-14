import { Link } from "react-router-dom";

type BlogPostMeta = {
  slug: string;
  title: string;
  summary: string;
};

type BlogListProps = {
  posts: BlogPostMeta[];
};

const BlogList = ({ posts }: BlogListProps) => {
  if (posts.length === 0) {
    return <p>Loading posts...</p>;
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Link key={post.slug} to={`/blog/${post.slug}`} className="block w-full">
          <section className="grid-container w-full max-w-full border border-gray-700 hover:border-blue-400 transition-colors duration-150">
            <h2 className="text-2xl font-semibold mb-2 text-blue-400">{post.title}</h2>
            {post.summary && <p className="text-gray-300 mb-3">{post.summary}</p>}
            <p className="text-gray-300">Click to read more...</p>
          </section>
        </Link>
      ))}
    </div>
  );
};

export type { BlogPostMeta };
export default BlogList;
