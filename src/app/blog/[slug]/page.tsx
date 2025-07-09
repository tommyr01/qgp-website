interface BlogPostProps {
  params: {
    slug: string
  }
}

export default function BlogPost({ params }: BlogPostProps) {
  return (
    <main className="page-wrapper">
      <section className="section">
        <div className="container-default w-container">
          <div className="text-center">
            <h1 className="color-neutral-400 mg-bottom-40px">
              Blog Post: {params.slug}
            </h1>
            <p className="subheading-text">
              This will load the actual blog post content from markdown.
            </p>
          </div>
          
          <div className="blog-content">
            <p>Blog content will be rendered here...</p>
          </div>
        </div>
      </section>
    </main>
  )
} 