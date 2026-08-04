import { useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import posts from "virtual:blog-posts";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const post = useMemo(() => posts.find((p) => p.slug === slug), [slug]);

  // Find prev/next posts for navigation
  const postIndex = useMemo(() => posts.findIndex((p) => p.slug === slug), [slug]);
  const prevPost = postIndex > 0 ? posts[postIndex - 1] : null;
  const nextPost = postIndex < posts.length - 1 ? posts[postIndex + 1] : null;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="blog-page">
      <article className="blog-post">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Link to="/blog" className="blog-post__back">
            <ArrowLeft size={18} />
            Back to Blog
          </Link>
        </motion.div>

        {/* Post header */}
        <motion.header
          className="blog-post__header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="blog-post__title">{post.title}</h1>

          <div className="blog-post__meta">
            <span className="blog-post__meta-item">
              <Calendar />
              {formattedDate}
            </span>
            <span className="blog-post__meta-item">
              <Clock />
              {post.readingTime} min read
            </span>
          </div>

          <div className="blog-post__tags">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                to={`/blog?tag=${tag}`}
                className="blog-post__tag"
              >
                {tag}
              </Link>
            ))}
          </div>
        </motion.header>

        {/* Cover image */}
        {post.coverImage && (
          <motion.img
            src={post.coverImage}
            alt={post.title}
            className="blog-post__cover"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        )}

        <hr className="blog-post__divider" />

        {/* Markdown content */}
        <motion.div
          className="blog-prose"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {post.content}
          </ReactMarkdown>
        </motion.div>

        {/* Post navigation */}
        {(prevPost || nextPost) && (
          <motion.nav
            className="blog-post-nav"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {prevPost && (
              <Link
                to={`/blog/${prevPost.slug}`}
                className="blog-post-nav__link"
              >
                <span className="blog-post-nav__label">← Previous</span>
                <span className="blog-post-nav__title">{prevPost.title}</span>
              </Link>
            )}
            {nextPost && (
              <Link
                to={`/blog/${nextPost.slug}`}
                className="blog-post-nav__link blog-post-nav__link--next"
              >
                <span className="blog-post-nav__label">Next →</span>
                <span className="blog-post-nav__title">{nextPost.title}</span>
              </Link>
            )}
          </motion.nav>
        )}
      </article>
    </div>
  );
};

export default BlogPostPage;
