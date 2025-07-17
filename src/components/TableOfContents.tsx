'use client'

import { useState, useEffect } from 'react'
import { trackEvent } from './Analytics'

interface TOCItem {
  id: string
  title: string
  level: number
  completed: boolean
}

const tocItems: TOCItem[] = [
  { id: 'introduction', title: 'Introduction', level: 1, completed: false },
  { id: 'hidden-cost', title: 'The Hidden Cost of Manual Meeting Management', level: 2, completed: false },
  { id: 'what-youll-learn', title: 'What You\'ll Learn in This Guide', level: 2, completed: false },
  { id: 'workflow-overview', title: 'The Meeting Automation Workflow', level: 2, completed: false },
  { id: 'choose-platform', title: 'Step 1: Choose Your Automation Platform', level: 1, completed: false },
  { id: 'tool-comparison', title: 'Interactive Tool Comparison', level: 2, completed: false },
  { id: 'meeting-detection', title: 'Step 2: Set Up Meeting Detection', level: 1, completed: false },
  { id: 'ai-transcription', title: 'Step 3: Configure AI Transcription', level: 1, completed: false },
  { id: 'knowledge-repository', title: 'Step 4: Build Your Knowledge Repository', level: 1, completed: false },
  { id: 'team-communication', title: 'Step 5: Automate Team Communication', level: 1, completed: false },
  { id: 'measure-roi', title: 'Step 6: Measure Your ROI', level: 1, completed: false },
  { id: 'roi-calculator', title: 'ROI Calculator', level: 2, completed: false },
  { id: 'implementation-checklist', title: 'Implementation Checklist', level: 2, completed: false },
  { id: 'common-challenges', title: 'Common Challenges and Solutions', level: 2, completed: false },
  { id: 'case-studies', title: 'Real Results from QGP Clients', level: 1, completed: false },
  { id: 'video-walkthrough', title: 'Video Walkthrough', level: 2, completed: false },
  { id: 'templates', title: 'Free Templates & Resources', level: 2, completed: false },
  { id: 'next-steps', title: 'Your Next Steps', level: 1, completed: false },
  { id: 'conclusion', title: 'The Bottom Line', level: 1, completed: false }
]

export default function TableOfContents() {
  const [items, setItems] = useState<TOCItem[]>(tocItems)
  const [currentSection, setCurrentSection] = useState<string>('')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (winScroll / height) * 100
      setScrollProgress(scrolled)

      // Show/hide TOC based on scroll position
      setIsVisible(winScroll > 300)

      // Find current section
      const sections = items.map(item => item.id)
      let current = ''
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = sectionId
            break
          }
        }
      }
      
      if (current !== currentSection) {
        setCurrentSection(current)
        
        // Mark sections as completed when scrolled past
        setItems(prevItems => 
          prevItems.map(item => ({
            ...item,
            completed: sections.indexOf(item.id) <= sections.indexOf(current) && current !== ''
          }))
        )
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [items, currentSection])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      trackEvent({
        action: 'toc_click',
        category: 'navigation',
        label: sectionId
      })
    }
  }

  const getCompletionPercentage = () => {
    const completedItems = items.filter(item => item.completed).length
    return Math.round((completedItems / items.length) * 100)
  }

  if (!isVisible) return null

  return (
    <div className="fixed top-20 right-4 z-50 max-w-xs">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Table of Contents</h3>
          <div className="text-sm text-gray-600">{getCompletionPercentage()}%</div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${scrollProgress}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {Math.round(scrollProgress)}% complete
          </div>
        </div>

        {/* TOC Items */}
        <div className="max-h-96 overflow-y-auto">
          <ul className="space-y-1">
            {items.map((item) => (
              <li
                key={item.id}
                className={`flex items-center cursor-pointer transition-colors duration-200 ${
                  item.level === 1 ? 'font-medium' : 'text-sm'
                } ${
                  item.level === 2 ? 'ml-4' : ''
                } ${
                  currentSection === item.id
                    ? 'text-blue-600 bg-blue-50 rounded px-2 py-1'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded px-2 py-1'
                }`}
                onClick={() => scrollToSection(item.id)}
              >
                <div className="flex items-center gap-2 flex-1">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    item.completed ? 'bg-green-500' : 
                    currentSection === item.id ? 'bg-blue-500' : 'bg-gray-300'
                  }`} />
                  <span className="truncate">{item.title}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Estimated Reading Time */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Reading time</span>
            <span>~12 min</span>
          </div>
        </div>
      </div>
    </div>
  )
}