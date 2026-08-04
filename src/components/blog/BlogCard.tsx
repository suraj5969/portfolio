import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import type { BlogPost } from "@/types";

// Generate a deterministic gradient from the post title
function titleToGradient(title: string): string {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h1 = Math.abs(hash % 360);
  const h2 = (h1 + 40 + Math.abs((hash >> 8) % 30)) % 360;
  return `linear-gradient(135deg, hsl(${h1}, 60%, 18%) 0%, hsl(${h2}, 50%, 12%) 100%)`;
}

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BlogCard = ({ post, index }: BlogCardProps) => {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link to={`/blog/${post.slug}`} className="block" style={{ textDecoration: "none" }}>
        <article className="blog-card">
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt={post.title}
              className="blog-card__cover"
            />
          ) : (
            <div
              className="blog-card__gradient-cover"
              style={{ background: titleToGradient(post.title) }}
            >
              <span className="blog-card__gradient-icon">✦</span>
            </div>
          )}

          <div className="blog-card__body">
            <div className="blog-card__meta">
              <span className="blog-card__meta-item">
                <Calendar />
                {formattedDate}
              </span>
              <span className="blog-card__meta-item">
                <Clock />
                {post.readingTime} min read
              </span>
            </div>

            <h3 className="blog-card__title">{post.title}</h3>
            <p className="blog-card__excerpt">{post.excerpt}</p>

            <div className="blog-card__tags">
              {post.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="blog-card__tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
