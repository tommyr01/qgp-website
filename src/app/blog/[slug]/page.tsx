import { getPostBySlug, getAllPostSlugs } from '../../../lib/blog'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface BlogPostProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="page-wrapper">
      {/* Breadcrumb Navigation */}
      <section className="blog-breadcrumb">
        <div className="container-default w-container">
          <div className="breadcrumb-content">
            <Link href="/blog" className="breadcrumb-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Post Header */}
      <section className="blog-post-header">
        <div className="container-default w-container">
          <div className="blog-post-header-content">
            <div className="post-meta">
              <span className="post-category-tag">
                {post.category}
              </span>
              <span className="post-date">
                {post.date}
              </span>
            </div>
            <h1 className="post-title">
              {post.title}
            </h1>
            <p className="post-excerpt">
              {post.excerpt}
            </p>
            <div className="post-author-section">
              <div className="author-avatar-large"></div>
              <div className="author-info">
                <div className="author-name-large">{post.author}</div>
                <div className="author-meta">5 min read</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Post Content */}
      <section className="blog-post-content-section">
        <div className="container-default w-container">
          <div className="post-content-wrapper">
            <article className="post-content">
              <div 
                className="prose prose-lg"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>
            
            {/* Sidebar */}
            <aside className="post-sidebar">
              <div className="sidebar-widget">
                <h3 className="sidebar-title">Share this article</h3>
                <div className="share-buttons">
                  <button className="share-btn twitter">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M19 4s-1 1-3 1 2-2 2-2-1 0-3 1-2 2-2 2-1-1-3-1-2 1-2 1 1 3 1 3-3 0-3 0c0 0 3 1 3 3s-1 3-1 3 3 0 3 0-1 1-1 3 2 2 2 2 0-3 2-3 3 1 3 1-1-1-1-3 1-2 1-2 1 0 3 0 2-2 2-2-2 0-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Twitter
                  </button>
                  <button className="share-btn linkedin">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 6h12v12H4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 10v6M8 8.5a1.5 1.5 0 0 1 3 0V16M12 10a2 2 0 0 1 4 0v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    LinkedIn
                  </button>
                </div>
              </div>
              
              <div className="sidebar-widget">
                <h3 className="sidebar-title">Table of Contents</h3>
                <nav className="toc">
                  <ul className="toc-list">
                    <li><a href="#introduction">Introduction</a></li>
                    <li><a href="#main-content">Main Content</a></li>
                    <li><a href="#conclusion">Conclusion</a></li>
                  </ul>
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="blog-post-newsletter">
        <div className="container-default w-container">
          <div className="newsletter-card-inline">
            <div className="newsletter-content-inline">
              <h3 className="newsletter-title-inline">
                Enjoyed this article?
              </h3>
              <p className="newsletter-description-inline">
                Get more insights like this delivered to your inbox
              </p>
            </div>
            <form className="newsletter-form-inline">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="newsletter-input-inline"
                required
              />
              <button type="submit" className="newsletter-btn-inline">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="related-posts">
        <div className="container-default w-container">
          <div className="related-posts-content">
            <h3 className="related-posts-title">More articles you might like</h3>
            <div className="related-posts-grid">
              <Link href="/blog" className="related-post-card">
                <div className="related-post-category">Growth Strategy</div>
                <h4 className="related-post-title">How to Scale Your Business</h4>
                <div className="related-post-meta">5 min read</div>
              </Link>
              <Link href="/blog" className="related-post-card">
                <div className="related-post-category">AI & Automation</div>
                <h4 className="related-post-title">AI Tools for Founders</h4>
                <div className="related-post-meta">4 min read</div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 