import Link from 'next/link'
import { getAllPosts, BlogPostMeta } from '../../lib/blog'

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <main className="page-wrapper">
      {/* Hero Section with Rich Background */}
      <section className="section blog-hero-main">
        <div className="container-default w-container">
          <div className="inner-container _640px center">
            <div className="text-center">
              <div className="badge-primary large mg-bottom-16px">
                Latest Insights
              </div>
              <h1 className="heading-h1-size color-neutral-100 mg-bottom-24px">
                Growth Strategies That Actually Work
              </h1>
              <p className="paragraph-large color-neutral-200 mg-bottom-32px">
                Discover proven strategies, AI-powered workflows, and insider insights from successful founders who've scaled their businesses to 7 and 8 figures.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-overlay-gradient blog-hero-overlay"></div>
      </section>

      {/* Featured Article Section */}
      {posts.length > 0 && (
        <section id="featured" className="section main-posts featured-section">
          <div className="container-default w-container">
            <div className="text-center mg-bottom-64px">
              <h2 className="heading-h2-size color-neutral-700 mg-bottom-16px">
                Featured Article
              </h2>
              <p className="paragraph-large color-neutral-600">
                Our most popular insights on scaling with AI and strategic growth
              </p>
            </div>
            
            <div className="blog-card-featured-wrapper">
              <Link href={`/blog/${posts[0].slug}`} className="blog-card-link w-inline-block">
                <div className="blog-card-bg featured-large">
                  <div className="blog-card-bg-image featured-bg"></div>
                  <div className="blog-card-bg-overlay featured-overlay">
                    <div className="blog-card-bg-container featured-content">
                      <div className="blog-card-bg-badge-wrapper">
                        <div className="badge-primary category featured-badge">
                          {posts[0].category}
                        </div>
                        <div className="badge-secondary small featured-time">
                          5 min read
                        </div>
                      </div>
                      <div className="blog-card-details-container">
                        <h3 className="blog-card-heading display-3 color-neutral-100 mg-bottom-24px">
                          {posts[0].title}
                        </h3>
                        <p className="paragraph-large color-neutral-200 mg-bottom-32px">
                          {posts[0].excerpt}
                        </p>
                        <div className="author-container featured-author">
                          <div className="flex-horizontal">
                            <div className="avatar-circle _01 mg-right-12px"></div>
                            <div>
                              <div className="text-300 bold color-neutral-100">
                                {posts[0].author}
                              </div>
                              <div className="text-200 color-neutral-300">
                                {posts[0].date}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section id="categories" className="section categories-section">
        <div className="container-default w-container">
          <div className="text-center mg-bottom-64px">
            <h2 className="heading-h2-size color-neutral-700 mg-bottom-16px">
              Explore by Topic
            </h2>
            <p className="paragraph-large color-neutral-600">
              Find exactly what you're looking for
            </p>
          </div>
          
          <div className="grid-4-columns categories-grid">
            <div className="category-card">
              <div className="category-icon-wrapper">
                <div className="line-rounded-icon category-icon growth"></div>
              </div>
              <h4 className="heading-h4-size color-neutral-700 mg-bottom-12px">
                Growth Strategy
              </h4>
              <p className="text-300 color-neutral-600 mg-bottom-16px">
                Proven frameworks for scaling your business
              </p>
              <div className="text-200 color-neutral-500">
                {posts.filter(post => post.category === 'Growth Strategy').length} articles
              </div>
            </div>
            
            <div className="category-card">
              <div className="category-icon-wrapper">
                <div className="line-rounded-icon category-icon automation"></div>
              </div>
              <h4 className="heading-h4-size color-neutral-700 mg-bottom-12px">
                AI & Automation
              </h4>
              <p className="text-300 color-neutral-600 mg-bottom-16px">
                Leverage AI to streamline operations
              </p>
              <div className="text-200 color-neutral-500">
                {posts.filter(post => post.category === 'Automation').length} articles
              </div>
            </div>
            
            <div className="category-card">
              <div className="category-icon-wrapper">
                <div className="line-rounded-icon category-icon systems"></div>
              </div>
              <h4 className="heading-h4-size color-neutral-700 mg-bottom-12px">
                Systems & Process
              </h4>
              <p className="text-300 color-neutral-600 mg-bottom-16px">
                Build scalable operational frameworks
              </p>
              <div className="text-200 color-neutral-500">
                2 articles
              </div>
            </div>
            
            <div className="category-card">
              <div className="category-icon-wrapper">
                <div className="line-rounded-icon category-icon insights"></div>
              </div>
              <h4 className="heading-h4-size color-neutral-700 mg-bottom-12px">
                Case Studies
              </h4>
              <p className="text-300 color-neutral-600 mg-bottom-16px">
                Real results from our clients
              </p>
              <div className="text-200 color-neutral-500">
                3 articles
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles Grid */}
      <section className="section main-posts latest-section">
        <div className="container-default w-container">
          <div className="flex-horizontal space-between align-bottom mg-bottom-48px">
            <div>
              <h2 className="heading-h2-size color-neutral-700 mg-bottom-16px">
                Latest Articles
              </h2>
              <p className="paragraph-large color-neutral-600">
                Fresh insights delivered weekly
              </p>
            </div>
          </div>
          
          <div className="grid-3-columns blog-grid enhanced">
            {posts.slice(1).map((post: BlogPostMeta, index) => (
              <div key={post.slug} className="blog-card-wrapper">
                <Link href={`/blog/${post.slug}`} className="blog-card-link w-inline-block">
                  <div className="card blog-card enhanced">
                    <div className="blog-card-image-wrapper">
                      <div className={`blog-card-image gradient-${index + 1}`}></div>
                      <div className="blog-card-overlay">
                        <div className="badge-primary small category-overlay">
                          {post.category}
                        </div>
                      </div>
                    </div>
                    <div className="pd---content-inside-card enhanced">
                      <div className="blog-card-meta mg-bottom-16px">
                        <div className="text-200 color-neutral-500">
                          {post.date} • 4 min read
                        </div>
                      </div>
                      <div className="blog-card-heading-wrapper">
                        <h3 className="blog-card-heading heading-h4-size color-neutral-700 mg-bottom-16px">
                          {post.title}
                        </h3>
                      </div>
                      <p className="paragraph-small color-neutral-600 mg-bottom-24px">
                        {post.excerpt}
                      </p>
                      <div className="author-container">
                        <div className="flex-horizontal">
                          <div className={`avatar-circle _0${index + 2} mg-right-8px`}></div>
                          <div>
                            <div className="text-200 bold color-neutral-700">
                              {post.author}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="empty-state enhanced">
              <div className="text-center">
                <div className="empty-state-icon mg-bottom-24px">
                  <div className="line-rounded-icon large empty"></div>
                </div>
                <h3 className="heading-h3-size color-neutral-600 mg-bottom-16px">
                  No articles yet
                </h3>
                <p className="paragraph-large color-neutral-500 mg-bottom-32px">
                  We're working on some amazing content. Check back soon!
                </p>
                <Link href="/" className="btn-primary">
                  Explore Our Services
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
} 