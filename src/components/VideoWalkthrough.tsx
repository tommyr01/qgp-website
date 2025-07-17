'use client'

import { useState } from 'react'
import { trackEvent } from './Analytics'

interface VideoSection {
  id: string
  title: string
  duration: string
  description: string
  embedUrl: string
  thumbnail: string
}

const videoSections: VideoSection[] = [
  {
    id: 'overview',
    title: 'Meeting Automation Overview',
    duration: '3:24',
    description: 'Quick overview of what meeting automation can do for your business',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    thumbnail: '/images/video-thumb-overview.jpg'
  },
  {
    id: 'setup',
    title: 'Step-by-Step Setup',
    duration: '8:45',
    description: 'Complete walkthrough of setting up your first automation workflow',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    thumbnail: '/images/video-thumb-setup.jpg'
  },
  {
    id: 'advanced',
    title: 'Advanced Configurations',
    duration: '6:12',
    description: 'Tips for customizing your automation for maximum efficiency',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    thumbnail: '/images/video-thumb-advanced.jpg'
  },
  {
    id: 'troubleshooting',
    title: 'Common Issues & Solutions',
    duration: '4:33',
    description: 'How to solve the most common problems users encounter',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    thumbnail: '/images/video-thumb-troubleshooting.jpg'
  }
]

interface CaseStudy {
  id: string
  company: string
  industry: string
  teamSize: string
  challenge: string
  solution: string
  results: {
    timeSaved: string
    costSavings: string
    efficiency: string
    actionItemCompletion: string
  }
  testimonial: {
    quote: string
    author: string
    title: string
  }
  implementation: {
    timeline: string
    toolsUsed: string[]
    keyFeatures: string[]
  }
}

const caseStudies: CaseStudy[] = [
  {
    id: 'techstart',
    company: 'TechStart Inc.',
    industry: 'Technology',
    teamSize: '50 employees',
    challenge: 'Rapid growth led to 30+ weekly meetings with no standardized documentation process. Critical decisions were lost, and action items fell through the cracks.',
    solution: 'Implemented comprehensive meeting automation using Lindy.ai with custom Airtable integration and Slack notifications.',
    results: {
      timeSaved: '85%',
      costSavings: '$127,000/year',
      efficiency: '92%',
      actionItemCompletion: '60% → 92%'
    },
    testimonial: {
      quote: "Meeting automation transformed our startup culture. We went from chaotic meetings to having a searchable knowledge base of every decision. It's like having a company brain that never forgets.",
      author: 'Sarah Johnson',
      title: 'VP of Operations'
    },
    implementation: {
      timeline: '2 weeks',
      toolsUsed: ['Lindy.ai', 'Airtable', 'Slack', 'Google Calendar'],
      keyFeatures: ['Auto-transcription', 'Action item extraction', 'Decision tracking', 'Team notifications']
    }
  },
  {
    id: 'growthagency',
    company: 'Growth Agency Pro',
    industry: 'Marketing',
    teamSize: '25 employees',
    challenge: 'Client meetings were consuming 40% of team time in documentation and follow-ups. No centralized client communication history.',
    solution: 'Custom Make.com workflow connecting Zoom, Airtable, and client portals with automated summary generation.',
    results: {
      timeSaved: '75%',
      costSavings: '$89,000/year',
      efficiency: '88%',
      actionItemCompletion: '55% → 89%'
    },
    testimonial: {
      quote: "Our clients love the immediate meeting summaries and clear action items. It's elevated our professionalism and improved client satisfaction by 23%.",
      author: 'Michael Chen',
      title: 'Agency Director'
    },
    implementation: {
      timeline: '3 weeks',
      toolsUsed: ['Make.com', 'Zoom', 'Airtable', 'Client Portal'],
      keyFeatures: ['Client-specific summaries', 'Portal integration', 'Automated follow-ups', 'Progress tracking']
    }
  },
  {
    id: 'scaleup',
    company: 'ScaleUp Consulting',
    industry: 'Business Consulting',
    teamSize: '75 employees',
    challenge: 'Multiple client engagements required extensive meeting documentation. Manual processes didn't scale with growth.',
    solution: 'Zapier-based automation connecting multiple tools with custom AI prompts for different meeting types.',
    results: {
      timeSaved: '70%',
      costSavings: '$156,000/year',
      efficiency: '85%',
      actionItemCompletion: '50% → 87%'
    },
    testimonial: {
      quote: "The automation scales with our business. Whether we have 5 or 50 client meetings per week, every single one is properly documented and tracked.",
      author: 'Alex Rodriguez',
      title: 'Managing Partner'
    },
    implementation: {
      timeline: '4 weeks',
      toolsUsed: ['Zapier', 'OpenAI', 'Notion', 'Teams', 'CRM'],
      keyFeatures: ['Multi-tool integration', 'Custom AI prompts', 'Client categorization', 'Automated CRM updates']
    }
  }
]

export default function VideoWalkthrough() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<string | null>(null)

  const handleVideoClick = (videoId: string) => {
    trackEvent({
      action: 'video_play',
      category: 'engagement',
      label: videoId
    })
    setSelectedVideo(videoId)
  }

  const handleCaseStudyClick = (caseStudyId: string) => {
    trackEvent({
      action: 'case_study_view',
      category: 'engagement',
      label: caseStudyId
    })
    setSelectedCaseStudy(selectedCaseStudy === caseStudyId ? null : caseStudyId)
  }

  return (
    <div className="my-16">
      {/* Video Walkthrough Section */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Video Walkthrough</h2>
          <p className="text-xl text-gray-600">
            Watch our step-by-step guide to implementing meeting automation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {videoSections.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleVideoClick(video.id)}
            >
              <div className="relative">
                <div className="bg-gray-200 h-32 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                  </svg>
                </div>
                <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
                <p className="text-gray-600 text-sm">{video.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Video Player */}
        {selectedVideo && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {videoSections.find(v => v.id === selectedVideo)?.title}
              </h3>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Video player would be embedded here</p>
            </div>
          </div>
        )}
      </div>

      {/* Case Studies Section */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Real Results from Our Clients</h2>
          <p className="text-xl text-gray-600">
            See how companies like yours have transformed their meeting workflows
          </p>
        </div>

        <div className="space-y-6">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div
                className="p-6 cursor-pointer"
                onClick={() => handleCaseStudyClick(study.id)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-600">{study.company}</h3>
                    <div className="flex gap-4 text-sm text-gray-600 mt-1">
                      <span>{study.industry}</span>
                      <span>•</span>
                      <span>{study.teamSize}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{study.results.timeSaved}</div>
                      <div className="text-sm text-gray-600">Time Saved</div>
                    </div>
                    <svg
                      className={`w-5 h-5 transition-transform ${
                        selectedCaseStudy === study.id ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{study.challenge}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600">{study.results.costSavings}</div>
                    <div className="text-sm text-gray-600">Annual Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600">{study.results.efficiency}</div>
                    <div className="text-sm text-gray-600">Efficiency</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600">{study.results.actionItemCompletion}</div>
                    <div className="text-sm text-gray-600">Action Items</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600">{study.implementation.timeline}</div>
                    <div className="text-sm text-gray-600">Implementation</div>
                  </div>
                </div>
              </div>

              {/* Expanded Case Study Details */}
              {selectedCaseStudy === study.id && (
                <div className="border-t border-gray-200 p-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold mb-3">Solution & Implementation</h4>
                      <p className="text-gray-700 mb-4">{study.solution}</p>
                      
                      <div className="mb-4">
                        <h5 className="font-medium mb-2">Tools Used:</h5>
                        <div className="flex flex-wrap gap-2">
                          {study.implementation.toolsUsed.map((tool, index) => (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">Key Features:</h5>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          {study.implementation.keyFeatures.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Client Testimonial</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700 italic mb-3">&ldquo;{study.testimonial.quote}&rdquo;</p>
                        <div className="text-sm text-gray-600">
                          <div className="font-medium">{study.testimonial.author}</div>
                          <div>{study.testimonial.title}, {study.company}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}