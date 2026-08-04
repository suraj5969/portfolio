import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import posts from "virtual:blog-posts";
import BlogCard from "./BlogCard";

const BlogListPage = () => {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Collect all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, []);

  // Filter posts by active tag
  const filteredPosts = useMemo(() => {
    if (!activeTag) return posts;
    return posts.filter((post) => post.tags.includes(activeTag));
  }, [activeTag]);

  return (
    <div className="blog-page">
      <div className="blog-container">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link to="/" className="blog-post__back" style={{ display: "inline-flex", marginBottom: "1rem" }}>
            <ArrowLeft size={18} />
            Back to Portfolio
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          className="blog-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>
            My <span className="gradient-text">Blog</span>
          </h1>
          <p>
            Thoughts on development, architecture, tooling, and whatever else I find interesting enough to write about.
          </p>
        </motion.div>

        {/* Tag filters */}
        {allTags.length > 0 && (
          <motion.div
            className="blog-tags"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <button
              className={`blog-tag ${activeTag === null ? "blog-tag--active" : ""}`}
              onClick={() => setActiveTag(null)}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`blog-tag ${activeTag === tag ? "blog-tag--active" : ""}`}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              >
                {tag}
              </button>
            ))}
          </motion.div>
        )}

        {/* Post grid */}
        {filteredPosts.length > 0 ? (
          <div className="blog-grid">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="blog-empty">
            <div className="blog-empty__icon">📝</div>
            <p className="blog-empty__text">
              No posts found{activeTag ? ` tagged "${activeTag}"` : ""}. Check back soon!
            </p>
          </div>
        )}

        {/* Bottom spacer */}
        <div style={{ height: "4rem" }} />
      </div>
    </div>
  );
};

export default BlogListPage;
