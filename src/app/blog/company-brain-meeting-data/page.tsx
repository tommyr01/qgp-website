import { getPostBySlug } from '../../../lib/blog'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import MeetingROICalculatorModern from '../../../components/MeetingROICalculatorModern'
import StructuredData from '../../../components/StructuredData'
import Analytics from '../../../components/Analytics'
import SocialShare from '../../../components/SocialShare'
import CTAButton from '../../../components/CTAButton'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Why Smart Founders Are Building a Company Brain from Meeting Data | QGP',
  description: 'Discover how AI meeting tools can transform your scattered meeting notes into searchable business intelligence. Free ROI calculator shows your knowledge loss.',
  keywords: 'AI meeting note taker, conversation intelligence software, AI meeting assistant, meeting intelligence tools, company brain, business intelligence',
  openGraph: {
    title: 'Why Smart Founders Are Building a Company Brain from Meeting Data',
    description: 'Stop losing $50K+ monthly in meeting insights. Build your company brain with AI meeting intelligence.',
    type: 'article',
    publishedTime: '2025-01-23',
    authors: ['Tommy Richardson'],
    images: [
      {
        url: '/images/company-brain-meeting-data-og.png',
        width: 1200,
        height: 630,
        alt: 'Company Brain Meeting Data Guide'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Smart Founders Are Building a Company Brain from Meeting Data',
    description: 'Stop losing $50K+ monthly in meeting insights. Build your company brain with AI meeting intelligence.',
    images: ['/images/company-brain-meeting-data-og.png']
  }
}

export default async function CompanyBrainMeetingDataPost() {
  const post = await getPostBySlug('company-brain-meeting-data')

  if (!post) {
    notFound()
  }

  // Split content to insert interactive components
  const contentParts = post.content.split('**Interactive ROI Calculator: Calculate Your Meeting Knowledge Loss**')
  const beforeCalculator = contentParts[0]
  
  const afterCalculator = contentParts[1] || ''

  // Structured data for SEO
  const articleData = {
    title: post.title,
    description: post.excerpt,
    author: post.author,
    datePublished: post.date,
    url: `https://quantumgrowthpartners.com/blog/company-brain-meeting-data`,
    image: 'https://quantumgrowthpartners.com/images/company-brain-meeting-data-og.png'
  }

  const howToData = {
    title: 'How to Build a Company Brain from Meeting Data',
    description: 'Complete guide to transforming meeting notes into searchable business intelligence',
    image: 'https://quantumgrowthpartners.com/images/company-brain-meeting-data-og.png',
    steps: [
      {
        '@type': 'HowToStep',
        name: 'Calculate Your Knowledge Loss',
        text: 'Use our ROI calculator to understand how much meeting intelligence your company is losing monthly'
      },
      {
        '@type': 'HowToStep',
        name: 'Choose Your Meeting Intelligence Platform',
        text: 'Compare AI meeting tools like Lindy.ai, Fathom, and Fireflies based on data storage and search capabilities'
      },
      {
        '@type': 'HowToStep',
        name: 'Start with High-Value Meetings',
        text: 'Begin capturing sales calls, customer feedback sessions, and strategic planning meetings'
      },
      {
        '@type': 'HowToStep',
        name: 'Build Your Searchable Knowledge Base',
        text: 'Let AI analyze and organize your meeting data into actionable business intelligence'
      },
      {
        '@type': 'HowToStep',
        name: 'Scale Across Your Organization',
        text: 'Expand to all teams and let your company brain compound value over time'
      }
    ]
  }

  return (
    <>
      <StructuredData type="Article" data={articleData} />
      <StructuredData type="HowTo" data={howToData} />
      <Analytics />
      <SocialShare 
        title={post.title}
        url={`https://quantumgrowthpartners.com/blog/company-brain-meeting-data`}
        description={post.excerpt}
      />
      
      {/* Print-only header */}
      <div className="print-only" style={{ display: 'none' }}>
        <div style={{ borderBottom: '2px solid #000', paddingBottom: '20px', marginBottom: '30px' }}>
          <h1 style={{ margin: '0 0 10px 0', fontSize: '24pt', fontWeight: 'bold' }}>{post.title}</h1>
          <p style={{ margin: '0 0 10px 0', fontSize: '14pt', color: '#666' }}>{post.excerpt}</p>
          <div style={{ fontSize: '12pt', color: '#666' }}>
            Published: {post.date} | Author: {post.author} | Quantum Growth Partners
          </div>
          <div style={{ fontSize: '10pt', color: '#666', marginTop: '5px' }}>
            Original URL: https://quantumgrowthpartners.com/blog/company-brain-meeting-data
          </div>
        </div>
      </div>

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
                  <div className="author-meta">10 min read</div>
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
                {/* First part of content */}
                <div 
                  className="prose prose-lg"
                  dangerouslySetInnerHTML={{ __html: beforeCalculator }}
                />
                
                {/* Meeting ROI Calculator */}
                <MeetingROICalculatorModern />
                
                {/* Final part of content */}
                <div 
                  className="prose prose-lg"
                  dangerouslySetInnerHTML={{ __html: afterCalculator }}
                />
              </article>
              
              {/* Sidebar */}
              <aside className="post-sidebar">
                <div className="sidebar-widget">
                  <h3 className="sidebar-title">Quick Navigation</h3>
                  <nav className="toc">
                    <ul className="toc-list space-y-2">
                      <li>
                        <a href="#roi-calculator" className="text-sm text-gray-600 hover:text-blue-600">
                          Calculate Your Loss
                        </a>
                      </li>
                      <li>
                        <a href="#tool-comparison" className="text-sm text-gray-600 hover:text-blue-600">
                          Compare Tools
                        </a>
                      </li>
                      <li>
                        <a href="#business-impact" className="text-sm text-gray-600 hover:text-blue-600">
                          Real Business Impact
                        </a>
                      </li>
                      <li>
                        <a href="#getting-started" className="text-sm text-gray-600 hover:text-blue-600">
                          Getting Started
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>

                <div className="sidebar-widget mt-8">
                  <h3 className="sidebar-title">Key Takeaways</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="text-sm font-medium text-red-800">Knowledge Loss</div>
                      <div className="text-sm text-red-600">80% of meeting insights vanish within 24 hours</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm font-medium text-blue-800">Solution</div>
                      <div className="text-sm text-blue-600">AI meeting intelligence builds your company brain</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-sm font-medium text-green-800">ROI</div>
                      <div className="text-sm text-green-600">Save $50K+ monthly in lost meeting value</div>
                    </div>
                  </div>
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
                  Ready to build your company brain?
                </h3>
                <p className="newsletter-description-inline">
                  Get proven strategies for capturing and leveraging meeting intelligence
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
                  Get Free Guide
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section bg-gradient-to-br from-purple-600 to-purple-700 text-white">
          <div className="container-default w-container">
            <div className="inner-container _640px center text-center">
              <h2 className="heading-h2-size text-white mg-bottom-24px">
                Stop Losing Meeting Intelligence
              </h2>
              <p className="paragraph-large text-white/90 mg-bottom-32px">
                Every day you wait is another day of valuable insights lost forever. Start building your company brain today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CTAButton 
                  href="https://lindy.ai"
                  variant="primary"
                >
                  Start Free Trial with Lindy.ai
                </CTAButton>
                <Link 
                  href="/contact" 
                  className="btn-secondary large border-white text-white hover:bg-white/10"
                >
                  Get Implementation Help
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="related-posts">
          <div className="container-default w-container">
            <div className="related-posts-content">
              <h3 className="related-posts-title">More AI & automation guides</h3>
              <div className="related-posts-grid">
                <Link href="/blog/workflow-automation-meeting-notes" className="related-post-card">
                  <div className="related-post-category">Workflow Automation</div>
                  <h4 className="related-post-title">How to Build a Meeting Automation System</h4>
                  <div className="related-post-meta">12 min read</div>
                </Link>
                <Link href="/blog" className="related-post-card">
                  <div className="related-post-category">AI & Automation</div>
                  <h4 className="related-post-title">AI Tools for Small Business</h4>
                  <div className="related-post-meta">8 min read</div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}