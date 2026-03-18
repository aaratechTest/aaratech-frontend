import "./BlogListPage.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBlogs } from "../../services/blogService";
import type { BlogListItem } from "../../types/blog";
import SEO from "../../components/SEO/SEO";
import { seoDefaults } from "../../constants/seoDefaults";
import { breadcrumbSchema } from "../../utils/structuredData";

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<BlogListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getBlogs()
      .then(setBlogs)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load blogs"))
      .finally(() => setLoading(false));
  }, []);

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <div className="blog-list">
      <SEO
        title={seoDefaults["blog"].title}
        description={seoDefaults["blog"].description}
        path="/blog"
        structuredData={breadcrumbSchema([{ name: "Blog", path: "/blog" }])}
      />
      {/* Hero */}
      <section className="blog-list__hero">
        <div className="blog-list__hero-content">
          <span className="blog-list__hero-label">Insights &amp; Updates</span>
          <h1 className="blog-list__hero-title">Our Blog</h1>
          <div className="blog-list__hero-divider" />
          <p className="blog-list__hero-desc">
            Stay ahead with the latest in technology, industry insights, and
            company updates from the AaraTech team.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="blog-list__section">
        {loading ? (
          <div className="blog-list__loading">Loading articles...</div>
        ) : error ? (
          <div className="blog-list__empty">
            <p>Something went wrong: {error}</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="blog-list__empty">
            <p>No articles published yet. Check back soon!</p>
          </div>
        ) : (
          <div className="blog-list__grid">
            {blogs.map((blog) => (
              <Link
                to={`/blog/${blog.slug}`}
                key={blog.id}
                className="blog-card"
              >
                <div className="blog-card__image-wrap">
                  {blog.coverImageUrl ? (
                    <img
                      src={blog.coverImageUrl}
                      alt={blog.title}
                      className="blog-card__image"
                      loading="lazy"
                    />
                  ) : (
                    <div className="blog-card__image-placeholder" />
                  )}
                  <div className="blog-card__overlay" />
                </div>
                <div className="blog-card__body">
                  <span className="blog-card__date">
                    {formatDate(blog.createdAt)}
                  </span>
                  <h3 className="blog-card__title">{blog.title}</h3>
                  {blog.excerpt && (
                    <p className="blog-card__excerpt">{blog.excerpt}</p>
                  )}
                  <span className="blog-card__read-more">
                    Read Article &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
