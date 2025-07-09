export default function BlogPage() {
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
          
          {/* Blog posts will be loaded here */}
          <div className="blog-grid">
            <div className="blog-card">
              <h2>Sample Blog Post</h2>
              <p>This is where blog posts will appear...</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 