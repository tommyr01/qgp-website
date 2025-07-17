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
      {/* Blog Post Hero */}
      <section className="section blog-post-hero">
        <div className="container-default w-container">
          <div className="inner-container _640px center">
            <div className="text-center">
              <div className="mg-bottom-24px">
                <div className="badge-primary small light category">
                  {post.category}
                </div>
              </div>
              <h1 className="heading-h1-size color-neutral-400 mg-bottom-32px">
                {post.title}
              </h1>
              <p className="paragraph-large color-neutral-600 mg-bottom-40px">
                {post.excerpt}
              </p>
              <div className="author-container mg-bottom-48px">
                <div className="text-300 color-neutral-500">
                  {post.date} • By {post.author}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Post Content */}
      <section className="section">
        <div className="container-default w-container">
          <div className="inner-container _640px center">
            <div className="card blog-post-content">
              <div className="pd---content-inside-card large">
                <div 
                  className="rich-text w-richtext"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="section small">
        <div className="container-default w-container">
          <div className="inner-container _640px center">
            <div className="text-center">
              <Link 
                href="/blog" 
                className="btn-secondary large"
              >
                ← Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 