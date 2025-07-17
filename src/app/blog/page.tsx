import Link from 'next/link'
import { getAllPosts, BlogPostMeta } from '../../lib/blog'

export default async function BlogPage() {
  const posts = await getAllPosts()

  // Get unique categories from posts
  const categories = ['All', ...new Set(posts.map(post => post.category))]

  return (
    <main className="page-wrapper">
      {/* Minimalist Hero Section */}
      <section className="blog-hero-minimal">
        <div className="container-default w-container">
          <div className="blog-hero-content">
            <h1 className="blog-hero-title">
              Insights & Resources
            </h1>
            <p className="blog-hero-subtitle">
              Practical strategies for scaling your business with AI
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Bar */}
      <section className="blog-filter-section">
        <div className="container-default w-container">
          <div className="filter-wrapper">
            <div className="search-box">
              <input 
                type="text" 
                placeholder="Search articles..." 
                className="search-input"
              />
              <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="category-filters">
              {categories.map((category) => (
                <button key={category} className="filter-btn">
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="blog-main-content">
        <div className="container-default w-container">
          {posts.length > 0 ? (
            <div className="blog-grid-modern">
              {posts.map((post: BlogPostMeta, index) => (
                <article key={post.slug} className={`blog-card-modern ${index === 0 ? 'featured' : ''}`}>
                  <Link href={`/blog/${post.slug}`} className="blog-card-link-modern">
                    <div className="blog-card-content">
                      <div className="blog-card-header">
                        <span className="blog-category-tag">
                          {post.category}
                        </span>
                        <span className="blog-read-time">
                          5 min read
                        </span>
                      </div>
                      <h2 className="blog-card-title">
                        {post.title}
                      </h2>
                      <p className="blog-card-excerpt">
                        {post.excerpt}
                      </p>
                      <div className="blog-card-footer">
                        <div className="blog-author-info">
                          <div className="author-avatar"></div>
                          <div className="author-details">
                            <span className="author-name">{post.author}</span>
                            <span className="post-date">{post.date}</span>
                          </div>
                        </div>
                        <div className="read-more-arrow">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state-modern">
              <div className="empty-icon">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="31" stroke="#e5e7eb" strokeWidth="2"/>
                  <path d="M22 28h20M22 36h12" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="empty-title">No articles yet</h3>
              <p className="empty-description">
                We're crafting valuable content. Check back soon!
              </p>
              <Link href="/" className="btn-primary-modern">
                Back to Home
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="blog-newsletter">
        <div className="container-default w-container">
          <div className="newsletter-card">
            <div className="newsletter-content">
              <h3 className="newsletter-title">
                Get insights delivered
              </h3>
              <p className="newsletter-description">
                Join founders getting actionable tips on scaling with AI
              </p>
            </div>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="newsletter-input"
                required
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
} 