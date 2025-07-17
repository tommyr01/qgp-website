import { getPostBySlug } from '../../../lib/blog'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ToolComparison from '../../../components/ToolComparison'
import ROICalculator from '../../../components/ROICalculator'
import DownloadSection from '../../../components/DownloadSection'
import StructuredData from '../../../components/StructuredData'
import Analytics from '../../../components/Analytics'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Build a Workflow Automation System for Meeting Notes | QGP',
  description: 'Learn how to save 10 hours per week with our step-by-step guide to automating meeting notes. Free templates included. No coding required.',
  keywords: 'workflow automation, meeting automation, automated meeting notes, AI meeting assistant, meeting productivity, business automation',
  openGraph: {
    title: 'How to Build a Workflow Automation System for Meeting Notes',
    description: 'Save 10+ hours per week by automating your meeting documentation. Complete guide with free templates.',
    type: 'article',
    publishedTime: '2024-01-22',
    authors: ['Tommy Richardson'],
    images: [
      {
        url: '/images/meeting-automation-og.png',
        width: 1200,
        height: 630,
        alt: 'Meeting Automation Workflow Guide'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Build a Workflow Automation System for Meeting Notes',
    description: 'Save 10+ hours per week by automating your meeting documentation. Complete guide with free templates.',
    images: ['/images/meeting-automation-og.png']
  }
}

export default async function MeetingAutomationBlogPost() {
  const post = await getPostBySlug('workflow-automation-meeting-notes')

  if (!post) {
    notFound()
  }

  // Split content to insert interactive components
  const contentParts = post.content.split('<h2>Step 1: Choose Your Automation Platform</h2>')
  const beforeComparison = contentParts[0]
  
  const afterComparisonParts = contentParts[1]?.split('<h2>Step 6: Measure Your ROI</h2>') || ['', '']
  const betweenComponents = '<h2>Step 1: Choose Your Automation Platform</h2>' + afterComparisonParts[0]
  
  const afterCalculatorParts = ('<h2>Step 6: Measure Your ROI</h2>' + afterComparisonParts[1]).split('<h2>Your Next Steps</h2>')
  const beforeDownloads = afterCalculatorParts[0]
  const afterDownloads = '<h2>Your Next Steps</h2>' + (afterCalculatorParts[1] || '')

  // Structured data for SEO
  const articleData = {
    title: post.title,
    description: post.excerpt,
    author: post.author,
    datePublished: post.date,
    url: `https://quantumgrowthpartners.com/blog/workflow-automation-meeting-notes`,
    image: 'https://quantumgrowthpartners.com/images/meeting-automation-og.png'
  }

  const howToData = {
    title: 'How to Automate Meeting Notes',
    description: 'Complete guide to implementing meeting automation workflow',
    image: 'https://quantumgrowthpartners.com/images/meeting-automation-og.png',
    steps: [
      {
        '@type': 'HowToStep',
        name: 'Choose Your Automation Platform',
        text: 'Select between Lindy.ai, Make.com, or Zapier based on your technical skills and requirements'
      },
      {
        '@type': 'HowToStep',
        name: 'Set Up Meeting Detection',
        text: 'Configure calendar integration to automatically detect when meetings start and end'
      },
      {
        '@type': 'HowToStep',
        name: 'Configure AI Transcription',
        text: 'Set up AI-powered transcription service to convert speech to searchable text'
      },
      {
        '@type': 'HowToStep',
        name: 'Build Knowledge Repository',
        text: 'Create Airtable database to store meeting summaries, decisions, and action items'
      },
      {
        '@type': 'HowToStep',
        name: 'Automate Team Communication',
        text: 'Set up Slack integration to automatically share summaries and notify assignees'
      },
      {
        '@type': 'HowToStep',
        name: 'Measure ROI',
        text: 'Track time savings and calculate return on investment from automation'
      }
    ]
  }

  return (
    <>
      <StructuredData type="Article" data={articleData} />
      <StructuredData type="HowTo" data={howToData} />
      <Analytics />
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
                {/* First part of content */}
                <div 
                  className="rich-text w-richtext"
                  dangerouslySetInnerHTML={{ __html: beforeComparison }}
                />
                
                {/* Interactive Tool Comparison */}
                <ToolComparison />
                
                {/* Middle part of content */}
                <div 
                  className="rich-text w-richtext"
                  dangerouslySetInnerHTML={{ __html: betweenComponents }}
                />
                
                {/* ROI Calculator */}
                <ROICalculator />
                
                {/* Content before downloads */}
                <div 
                  className="rich-text w-richtext"
                  dangerouslySetInnerHTML={{ __html: beforeDownloads }}
                />
                
                {/* Download Section */}
                <DownloadSection />
                
                {/* Final part of content */}
                <div 
                  className="rich-text w-richtext"
                  dangerouslySetInnerHTML={{ __html: afterDownloads }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container-default w-container">
          <div className="inner-container _640px center text-center">
            <h2 className="heading-h2-size text-white mg-bottom-24px">
              Ready to Get Started?
            </h2>
            <p className="paragraph-large text-white/90 mg-bottom-32px">
              Download our free templates and start automating your meetings today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-secondary large bg-white text-blue-600 hover:bg-gray-100">
                Download Templates
              </button>
              <Link href="/contact" className="btn-secondary large border-white text-white hover:bg-white/10">
                Schedule Consultation
              </Link>
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
    </>
  )
}