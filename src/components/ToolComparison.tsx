'use client'

import { useState } from 'react'
import { trackToolComparison } from './Analytics'

interface Tool {
  name: string
  logo?: string
  trialUrl: string
  demoUrl?: string
  features: {
    meetingDetection: string
    transcription: string
    summaries: string
    actionExtraction: string
    easeOfSetup: string
    monthlyCost: string
    bestFor: string
  }
  pros: string[]
  cons: string[]
  rating: number
  companySize: string[]
  technicalLevel: 'beginner' | 'intermediate' | 'advanced'
  testimonial?: {
    quote: string
    author: string
    company: string
  }
}

const tools: Tool[] = [
  {
    name: 'Lindy.ai',
    trialUrl: 'https://lindy.ai/trial',
    demoUrl: 'https://lindy.ai/demo',
    features: {
      meetingDetection: 'Automatic',
      transcription: 'Built-in',
      summaries: 'Advanced AI',
      actionExtraction: 'Automatic',
      easeOfSetup: '15 minutes',
      monthlyCost: '$49-199',
      bestFor: 'Non-technical users'
    },
    pros: [
      'Fastest setup time',
      'No technical knowledge required',
      'Best AI summarization',
      'Native meeting features'
    ],
    cons: [
      'Higher price point',
      'Less customization',
      'Newer platform'
    ],
    rating: 4.8,
    companySize: ['1-10', '11-50', '51-200'],
    technicalLevel: 'beginner',
    testimonial: {
      quote: "Lindy.ai transformed our meeting workflow in just one week. The AI summaries are incredibly accurate.",
      author: "Sarah Johnson",
      company: "TechStart Inc."
    }
  },
  {
    name: 'Make.com',
    trialUrl: 'https://make.com/en/register',
    features: {
      meetingDetection: 'Manual setup',
      transcription: 'Via integration',
      summaries: 'Basic',
      actionExtraction: 'Manual config',
      easeOfSetup: '45 minutes',
      monthlyCost: '$29-99',
      bestFor: 'Power users'
    },
    pros: [
      'Highly customizable',
      'Visual workflow builder',
      'Extensive integrations',
      'Cost-effective'
    ],
    cons: [
      'Steeper learning curve',
      'Requires configuration',
      'Manual AI setup'
    ],
    rating: 4.5,
    companySize: ['11-50', '51-200', '200+'],
    technicalLevel: 'intermediate',
    testimonial: {
      quote: "Make.com gives us the flexibility to customize our meeting automation exactly how we need it.",
      author: "Michael Chen",
      company: "Growth Agency"
    }
  },
  {
    name: 'Zapier',
    trialUrl: 'https://zapier.com/sign-up',
    features: {
      meetingDetection: 'Manual setup',
      transcription: 'Via integration',
      summaries: 'Basic',
      actionExtraction: 'Manual config',
      easeOfSetup: '30 minutes',
      monthlyCost: '$69-299',
      bestFor: 'Existing Zapier users'
    },
    pros: [
      'Most integrations',
      'Established platform',
      'Good documentation',
      'Reliable uptime'
    ],
    cons: [
      'Can get expensive',
      'Less AI-native',
      'Task limits'
    ],
    rating: 4.3,
    companySize: ['1-10', '11-50', '51-200', '200+'],
    technicalLevel: 'beginner',
    testimonial: {
      quote: "Zapier's reliability and extensive integrations make it perfect for our existing tech stack.",
      author: "Alex Rodriguez",
      company: "ScaleUp Co."
    }
  }
]

export default function ToolComparison() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const [comparisonMode, setComparisonMode] = useState(false)
  const [comparedTools, setComparedTools] = useState<string[]>([])
  const [filters, setFilters] = useState({
    companySize: '',
    technicalLevel: '',
    priceRange: ''
  })

  const toggleComparison = (toolName: string) => {
    if (comparedTools.includes(toolName)) {
      setComparedTools(comparedTools.filter(t => t !== toolName))
    } else if (comparedTools.length < 2) {
      setComparedTools([...comparedTools, toolName])
    }
  }

  const handleTrialClick = (toolName: string, url: string) => {
    trackToolComparison(`${toolName}_trial_click`)
    window.open(url, '_blank')
  }

  const handleDemoClick = (toolName: string, url: string) => {
    trackToolComparison(`${toolName}_demo_click`)
    window.open(url, '_blank')
  }

  const filteredTools = tools.filter(tool => {
    if (filters.companySize && !tool.companySize.includes(filters.companySize)) return false
    if (filters.technicalLevel && tool.technicalLevel !== filters.technicalLevel) return false
    if (filters.priceRange) {
      const price = parseInt(tool.features.monthlyCost.replace(/[^0-9]/g, ''))
      if (filters.priceRange === 'low' && price > 50) return false
      if (filters.priceRange === 'medium' && (price < 50 || price > 150)) return false
      if (filters.priceRange === 'high' && price < 150) return false
    }
    return true
  })

  const featureLabels = {
    meetingDetection: 'Meeting Detection',
    transcription: 'AI Transcription',
    summaries: 'Smart Summaries',
    actionExtraction: 'Action Extraction',
    easeOfSetup: 'Setup Time',
    monthlyCost: 'Monthly Cost',
    bestFor: 'Best For'
  }

  return (
    <div className="my-12">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Compare Meeting Automation Tools</h2>
        <p className="text-gray-600 mb-6">
          Find the perfect tool for your team size and technical expertise
        </p>
        
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <select
            value={filters.companySize}
            onChange={(e) => setFilters({...filters, companySize: e.target.value})}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Company Sizes</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="200+">200+ employees</option>
          </select>
          
          <select
            value={filters.technicalLevel}
            onChange={(e) => setFilters({...filters, technicalLevel: e.target.value})}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Technical Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          
          <select
            value={filters.priceRange}
            onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Price Ranges</option>
            <option value="low">Under $50/month</option>
            <option value="medium">$50-150/month</option>
            <option value="high">Over $150/month</option>
          </select>
        </div>

        <button
          onClick={() => setComparisonMode(!comparisonMode)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          {comparisonMode ? 'View All Tools' : 'Compare Side-by-Side'}
        </button>
      </div>

      {!comparisonMode ? (
        <div className="grid md:grid-cols-3 gap-6">
          {filteredTools.map(tool => (
            <div
              key={tool.name}
              className={`border rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg ${
                selectedTool === tool.name ? 'border-blue-500 shadow-lg' : 'border-gray-200'
              }`}
              onClick={() => {
                setSelectedTool(tool.name)
                trackToolComparison(tool.name)
              }}
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500">{'★'.repeat(Math.floor(tool.rating))}</span>
                  <span className="ml-2 text-gray-600">{tool.rating}/5</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">{tool.features.monthlyCost}</p>
              </div>

              <div className="space-y-2 mb-4">
                {Object.entries(featureLabels).map(([key, label]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-600">{label}:</span>
                    <span className="font-medium">{tool.features[key as keyof typeof tool.features]}</span>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-green-600 mb-1">Pros:</h4>
                <ul className="text-sm space-y-1">
                  {tool.pros.map((pro, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-500 mr-1">✓</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-red-600 mb-1">Cons:</h4>
                <ul className="text-sm space-y-1">
                  {tool.cons.map((con, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-red-500 mr-1">✗</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Testimonial */}
              {tool.testimonial && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm italic text-gray-700 mb-2">&ldquo;{tool.testimonial.quote}&rdquo;</p>
                  <p className="text-xs text-gray-600">
                    — {tool.testimonial.author}, {tool.testimonial.company}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-6 space-y-2">
                <button
                  onClick={() => handleTrialClick(tool.name, tool.trialUrl)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Start Free Trial
                </button>
                {tool.demoUrl && (
                  <button
                    onClick={() => handleDemoClick(tool.name, tool.demoUrl!)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Watch Demo
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className="mb-6 flex justify-center gap-4">
            {tools.map(tool => (
              <label key={tool.name} className="flex items-center">
                <input
                  type="checkbox"
                  checked={comparedTools.includes(tool.name)}
                  onChange={() => toggleComparison(tool.name)}
                  className="mr-2"
                />
                <span>{tool.name}</span>
              </label>
            ))}
          </div>

          {comparedTools.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-4 border-b">Feature</th>
                    {comparedTools.map(toolName => (
                      <th key={toolName} className="text-left p-4 border-b">
                        {toolName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(featureLabels).map(([key, label]) => (
                    <tr key={key} className="border-b">
                      <td className="p-4 font-medium">{label}</td>
                      {comparedTools.map(toolName => {
                        const tool = tools.find(t => t.name === toolName)!
                        return (
                          <td key={toolName} className="p-4">
                            {tool.features[key as keyof typeof tool.features]}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                  <tr className="border-b">
                    <td className="p-4 font-medium">Rating</td>
                    {comparedTools.map(toolName => {
                      const tool = tools.find(t => t.name === toolName)!
                      return (
                        <td key={toolName} className="p-4">
                          <span className="text-yellow-500">{'★'.repeat(Math.floor(tool.rating))}</span>
                          <span className="ml-2">{tool.rating}/5</span>
                        </td>
                      )
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}