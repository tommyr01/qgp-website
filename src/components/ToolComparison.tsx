'use client'

import { useState } from 'react'
import { trackToolComparison } from './Analytics'

interface Tool {
  name: string
  logo?: string
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
}

const tools: Tool[] = [
  {
    name: 'Lindy.ai',
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
    rating: 4.8
  },
  {
    name: 'Make.com',
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
    rating: 4.5
  },
  {
    name: 'Zapier',
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
    rating: 4.3
  }
]

export default function ToolComparison() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const [comparisonMode, setComparisonMode] = useState(false)
  const [comparedTools, setComparedTools] = useState<string[]>([])

  const toggleComparison = (toolName: string) => {
    if (comparedTools.includes(toolName)) {
      setComparedTools(comparedTools.filter(t => t !== toolName))
    } else if (comparedTools.length < 2) {
      setComparedTools([...comparedTools, toolName])
    }
  }

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
        <p className="text-gray-600 mb-4">
          Select tools to compare features side-by-side
        </p>
        <button
          onClick={() => setComparisonMode(!comparisonMode)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {comparisonMode ? 'View All Tools' : 'Compare Tools'}
        </button>
      </div>

      {!comparisonMode ? (
        <div className="grid md:grid-cols-3 gap-6">
          {tools.map(tool => (
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

              <button className="mt-6 w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                Try {tool.name} Free
              </button>
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