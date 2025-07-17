'use client'

import { useState } from 'react'
import { trackEvent } from './Analytics'

interface Tool {
  name: string
  logo: string
  description: string
  pricing: string
  bestFor: string
  features: {
    transcription: boolean
    search: boolean
    aiAnalysis: boolean
    dataStorage: string
    integrations: number
    customization: boolean
    api: boolean
    exports: boolean
  }
  pros: string[]
  cons: string[]
  trialUrl: string
  color: string
}

const tools: Tool[] = [
  {
    name: 'Fathom',
    logo: '🎯',
    description: 'Basic AI meeting assistant focused on transcription and simple summaries',
    pricing: '$19/month',
    bestFor: 'Small teams needing basic transcription',
    features: {
      transcription: true,
      search: true,
      aiAnalysis: false,
      dataStorage: '30 days',
      integrations: 5,
      customization: false,
      api: false,
      exports: true
    },
    pros: [
      'Simple setup and use',
      'Good transcription accuracy',
      'Affordable pricing'
    ],
    cons: [
      'Limited search capabilities',
      'No long-term data storage',
      'Basic analysis only'
    ],
    trialUrl: 'https://fathom.video',
    color: 'blue'
  },
  {
    name: 'Fireflies',
    logo: '🔥',
    description: 'Mid-tier solution with better search and some AI analysis features',
    pricing: '$10-18/month',
    bestFor: 'Growing teams wanting better search',
    features: {
      transcription: true,
      search: true,
      aiAnalysis: true,
      dataStorage: '6 months',
      integrations: 15,
      customization: true,
      api: true,
      exports: true
    },
    pros: [
      'Good search functionality',
      'Decent integration options',
      'Reasonable pricing'
    ],
    cons: [
      'Limited data retention',
      'Basic AI analysis',
      'No advanced customization'
    ],
    trialUrl: 'https://fireflies.ai',
    color: 'orange'
  },
  {
    name: 'Lindy.ai',
    logo: '🧠',
    description: 'Advanced AI platform designed for building searchable company intelligence',
    pricing: '$49/month',
    bestFor: 'Teams building a true company brain',
    features: {
      transcription: true,
      search: true,
      aiAnalysis: true,
      dataStorage: 'Unlimited',
      integrations: 50,
      customization: true,
      api: true,
      exports: true
    },
    pros: [
      'Unlimited data storage',
      'Advanced AI analysis',
      'Extensive customization',
      'Powerful search across all data'
    ],
    cons: [
      'Higher learning curve',
      'More expensive',
      'Requires setup time'
    ],
    trialUrl: 'https://lindy.ai',
    color: 'purple'
  }
]

export default function ToolComparisonTable() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)

  const handleToolClick = (toolName: string) => {
    setSelectedTool(selectedTool === toolName ? null : toolName)
    trackEvent({
      action: 'tool_comparison_click',
      category: 'engagement',
      label: toolName
    })
  }

  const handleTrialClick = (toolName: string, url: string) => {
    trackEvent({
      action: 'trial_click',
      category: 'conversion',
      label: toolName
    })
    window.open(url, '_blank')
  }

  const getFeatureIcon = (hasFeature: boolean | string) => {
    if (typeof hasFeature === 'string') {
      return <span className="text-sm text-gray-600">{hasFeature}</span>
    }
    return hasFeature ? (
      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ) : (
      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    )
  }

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'border-blue-200 bg-blue-50 hover:bg-blue-100',
      orange: 'border-orange-200 bg-orange-50 hover:bg-orange-100',
      purple: 'border-purple-200 bg-purple-50 hover:bg-purple-100'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const getRecommendedBadge = (toolName: string) => {
    if (toolName === 'Lindy.ai') {
      return (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-xs px-2 py-1 rounded-full font-medium">
          Recommended
        </div>
      )
    }
    return null
  }

  return (
    <div className="my-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Meeting Intelligence Platform
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Not all AI meeting tools are created equal. Here's how the top platforms compare for building your company brain.
          </p>
        </div>

        {/* Tool Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${getColorClasses(tool.color)} ${
                selectedTool === tool.name ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleToolClick(tool.name)}
            >
              {getRecommendedBadge(tool.name)}
              
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">{tool.logo}</div>
                <h3 className="text-xl font-bold text-gray-900">{tool.name}</h3>
                <p className="text-gray-600 text-sm mt-2">{tool.description}</p>
              </div>

              <div className="mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{tool.pricing}</div>
                  <div className="text-sm text-gray-600">per user/month</div>
                </div>
              </div>

              <div className="mb-6">
                <div className="bg-white rounded-lg p-3 text-center">
                  <div className="text-sm font-medium text-gray-700">Best For:</div>
                  <div className="text-sm text-gray-600">{tool.bestFor}</div>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleTrialClick(tool.name, tool.trialUrl)
                }}
                className="w-full bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Start Free Trial
              </button>

              {selectedTool === tool.name && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-green-700 mb-2">Pros:</h4>
                      <ul className="space-y-1">
                        {tool.pros.map((pro, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-red-700 mb-2">Cons:</h4>
                      <ul className="space-y-1">
                        {tool.cons.map((con, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                            <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Detailed Comparison Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Detailed Feature Comparison</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                  {tools.map((tool) => (
                    <th key={tool.name} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {tool.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">AI Transcription</td>
                  {tools.map((tool) => (
                    <td key={tool.name} className="px-6 py-4 whitespace-nowrap text-center">
                      {getFeatureIcon(tool.features.transcription)}
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Advanced Search</td>
                  {tools.map((tool) => (
                    <td key={tool.name} className="px-6 py-4 whitespace-nowrap text-center">
                      {getFeatureIcon(tool.features.search)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">AI Analysis</td>
                  {tools.map((tool) => (
                    <td key={tool.name} className="px-6 py-4 whitespace-nowrap text-center">
                      {getFeatureIcon(tool.features.aiAnalysis)}
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Data Storage</td>
                  {tools.map((tool) => (
                    <td key={tool.name} className="px-6 py-4 whitespace-nowrap text-center">
                      {getFeatureIcon(tool.features.dataStorage)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Integrations</td>
                  {tools.map((tool) => (
                    <td key={tool.name} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                      {tool.features.integrations}+
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">API Access</td>
                  {tools.map((tool) => (
                    <td key={tool.name} className="px-6 py-4 whitespace-nowrap text-center">
                      {getFeatureIcon(tool.features.api)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Customization</td>
                  {tools.map((tool) => (
                    <td key={tool.name} className="px-6 py-4 whitespace-nowrap text-center">
                      {getFeatureIcon(tool.features.customization)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Build Your Company Brain?</h3>
            <p className="text-lg mb-6 opacity-90">
              Start with Lindy.ai for unlimited data storage and advanced AI analysis
            </p>
            <button
              onClick={() => handleTrialClick('Lindy.ai', 'https://lindy.ai')}
              className="bg-white text-purple-700 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start Free Trial with Lindy.ai
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}