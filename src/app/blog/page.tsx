import Link from 'next/link'
import { getAllPosts, BlogPostMeta } from '../../lib/blog'

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <main className="page-wrapper">
      <section className="section">
        <div className="container-default w-container">
          <div className="text-center">
            <h1 className="color-neutral-400 mg-bottom-40px">
              Blog
            </h1>
            <p className="subheading-text">
              Insights, strategies, and stories from the world of growth acceleration.
            </p>
          </div>
          
          {/* Blog posts grid */}
          <div className="blog-grid" style={{ marginTop: '60px' }}>
            {posts.length > 0 ? (
              posts.map((post: BlogPostMeta) => (
                <div key={post.slug} className="blog-card" style={{ 
                  border: '1px solid #e5e5e5', 
                  borderRadius: '8px', 
                  padding: '24px', 
                  marginBottom: '24px' 
                }}>
                  <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
                    {post.category} • {post.date}
                  </div>
                  <h2 style={{ marginBottom: '12px' }}>
                    <Link 
                      href={`/blog/${post.slug}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p style={{ color: '#666', marginBottom: '16px' }}>
                    {post.excerpt}
                  </p>
                  <div style={{ fontSize: '14px', color: '#888' }}>
                    By {post.author}
                  </div>
                </div>
              ))
            ) : (
              <p>No blog posts found.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  )
} 