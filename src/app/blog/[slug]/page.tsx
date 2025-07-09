import { getPostBySlug, getAllPostSlugs } from '../../../lib/blog'
import { notFound } from 'next/navigation'

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
      <section className="section">
        <div className="container-default w-container">
          <div className="text-center" style={{ marginBottom: '40px' }}>
            <div style={{ marginBottom: '16px', fontSize: '14px', color: '#666' }}>
              {post.category} • {post.date} • By {post.author}
            </div>
            <h1 className="color-neutral-400 mg-bottom-40px">
              {post.title}
            </h1>
            <p className="subheading-text">
              {post.excerpt}
            </p>
          </div>
          
          <div 
            className="blog-content" 
            style={{ 
              maxWidth: '800px', 
              margin: '0 auto',
              lineHeight: '1.6',
              fontSize: '16px'
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>
    </main>
  )
} 