import { getPostBySlug } from '../../../lib/blog'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ToolComparison from '../../../components/ToolComparison'
import ROICalculator from '../../../components/ROICalculator'
import DownloadSection from '../../../components/DownloadSection'
import StructuredData from '../../../components/StructuredData'
import Analytics from '../../../components/Analytics'
import VideoWalkthrough from '../../../components/VideoWalkthrough'
import TableOfContents from '../../../components/TableOfContents'
import ProgressIndicator from '../../../components/ProgressIndicator'
import ABTestCTA from '../../../components/ABTestCTA'
import LazyWrapper, { ToolComparisonSkeleton, ROICalculatorSkeleton, VideoWalkthroughSkeleton } from '../../../components/LazyWrapper'
import SocialShare from '../../../components/SocialShare'
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
  
  const afterCalculatorParts = ('<h2>Step 6: Measure Your ROI</h2>' + afterComparisonParts[1]).split('<h2>Real Results from QGP Clients</h2>')
  const beforeDownloads = afterCalculatorParts[0]
  const afterVideoSection = ('<h2>Real Results from QGP Clients</h2>' + (afterCalculatorParts[1] || '')).split('<h2>Your Next Steps</h2>')
  const beforeCaseStudies = afterVideoSection[0]
  const afterDownloads = '<h2>Your Next Steps</h2>' + (afterVideoSection[1] || '')

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
      <TableOfContents />
      <SocialShare 
        title={post.title}
        url={`https://quantumgrowthpartners.com/blog/workflow-automation-meeting-notes`}
        description={post.excerpt}
      />
      <main className="page-wrapper">
      {/* Print-only header */}
      <div className="print-only" style={{ display: 'none' }}>
        <div style={{ borderBottom: '2px solid #000', paddingBottom: '20px', marginBottom: '30px' }}>
          <h1 style={{ margin: '0 0 10px 0', fontSize: '24pt', fontWeight: 'bold' }}>{post.title}</h1>
          <p style={{ margin: '0 0 10px 0', fontSize: '14pt', color: '#666' }}>{post.excerpt}</p>
          <div style={{ fontSize: '12pt', color: '#666' }}>
            Published: {post.date} | Author: {post.author} | Quantum Growth Partners
          </div>
          <div style={{ fontSize: '10pt', color: '#666', marginTop: '5px' }}>
            Original URL: https://quantumgrowthpartners.com/blog/workflow-automation-meeting-notes
          </div>
        </div>
      </div>

      {/* Blog Post Hero */}
      <section className="section blog-post-hero no-print">
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
                
                {/* Progress Indicator */}
                <ProgressIndicator />
                
                {/* Interactive Tool Comparison */}
                <LazyWrapper fallback={<ToolComparisonSkeleton />}>
                  <ToolComparison />
                </LazyWrapper>
                
                {/* Middle part of content */}
                <div 
                  className="rich-text w-richtext"
                  dangerouslySetInnerHTML={{ __html: betweenComponents }}
                />
                
                {/* ROI Calculator */}
                <LazyWrapper fallback={<ROICalculatorSkeleton />}>
                  <ROICalculator />
                </LazyWrapper>
                
                {/* Content before downloads */}
                <div 
                  className="rich-text w-richtext"
                  dangerouslySetInnerHTML={{ __html: beforeDownloads }}
                />
                
                {/* Download Section */}
                <DownloadSection />
                
                {/* Content before case studies */}
                <div 
                  className="rich-text w-richtext"
                  dangerouslySetInnerHTML={{ __html: beforeCaseStudies }}
                />
                
                {/* Video Walkthrough and Case Studies */}
                <LazyWrapper fallback={<VideoWalkthroughSkeleton />}>
                  <VideoWalkthrough />
                </LazyWrapper>
                
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

      {/* A/B Tested CTA Section */}
      <ABTestCTA />

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