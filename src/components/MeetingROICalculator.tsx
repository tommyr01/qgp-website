'use client'

import { useState, useCallback, useEffect } from 'react'
import { trackEvent } from './Analytics'

interface CalculatorInputs {
  meetingsPerWeek: number
  averageDuration: number
  teamSize: number
  hourlyRate: number
}

interface CalculatorResults {
  monthlyMeetingCost: number
  knowledgeLossCost: number
  potentialSavings: number
  yearlyLoss: number
}

export default function MeetingROICalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    meetingsPerWeek: 15,
    averageDuration: 45,
    teamSize: 12,
    hourlyRate: 75
  })

  const [results, setResults] = useState<CalculatorResults>({
    monthlyMeetingCost: 0,
    knowledgeLossCost: 0,
    potentialSavings: 0,
    yearlyLoss: 0
  })

  const [hasCalculated, setHasCalculated] = useState(false)

  const calculateROI = useCallback(() => {
    const { meetingsPerWeek, averageDuration, teamSize, hourlyRate } = inputs
    
    // Calculate monthly meeting cost
    const hoursPerMeeting = averageDuration / 60
    const monthlyMeetingHours = meetingsPerWeek * hoursPerMeeting * 4.33 // avg weeks per month
    const monthlyMeetingCost = monthlyMeetingHours * teamSize * hourlyRate
    
    // Calculate knowledge loss cost (80% of meeting value is lost)
    const knowledgeLossCost = monthlyMeetingCost * 0.8
    
    // Calculate potential savings (90% knowledge retention)
    const potentialSavings = monthlyMeetingCost * 0.9 - monthlyMeetingCost * 0.2
    
    // Calculate yearly loss
    const yearlyLoss = knowledgeLossCost * 12

    setResults({
      monthlyMeetingCost,
      knowledgeLossCost,
      potentialSavings,
      yearlyLoss
    })

    if (!hasCalculated) {
      setHasCalculated(true)
      trackEvent({
        action: 'meeting_roi_calculation',
        category: 'engagement',
        label: 'company_brain_calculator',
        value: Math.round(monthlyMeetingCost)
      })
    }
  }, [inputs, hasCalculated])

  useEffect(() => {
    calculateROI()
  }, [calculateROI])

  const handleInputChange = (field: keyof CalculatorInputs, value: number) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const exportResults = () => {
    const report = {
      inputs,
      results,
      insights: [
        `Your team spends ${formatCurrency(results.monthlyMeetingCost)} monthly on meetings`,
        `${formatCurrency(results.knowledgeLossCost)} of meeting value is lost each month`,
        `Building a company brain could save ${formatCurrency(results.potentialSavings)} monthly`,
        `Annual knowledge loss: ${formatCurrency(results.yearlyLoss)}`
      ],
      calculatedAt: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'meeting-roi-analysis.json'
    a.click()
    URL.revokeObjectURL(url)
    
    trackEvent({
      action: 'export_roi_results',
      category: 'conversion',
      label: 'meeting_calculator'
    })
  }

  return (
    <div className="my-16 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Calculate Your Meeting Knowledge Loss
          </h2>
          <p className="text-lg text-gray-600">
            Discover how much valuable meeting intelligence your company is losing every month
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Controls */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Your Meeting Profile</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meetings per week: {inputs.meetingsPerWeek}
                </label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={inputs.meetingsPerWeek}
                  onChange={(e) => handleInputChange('meetingsPerWeek', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>5</span>
                  <span>50</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average meeting duration: {inputs.averageDuration} minutes
                </label>
                <input
                  type="range"
                  min="15"
                  max="120"
                  value={inputs.averageDuration}
                  onChange={(e) => handleInputChange('averageDuration', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>15 min</span>
                  <span>120 min</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average team size: {inputs.teamSize} people
                </label>
                <input
                  type="range"
                  min="3"
                  max="100"
                  value={inputs.teamSize}
                  onChange={(e) => handleInputChange('teamSize', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>3</span>
                  <span>100</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average hourly rate: ${inputs.hourlyRate}
                </label>
                <input
                  type="range"
                  min="25"
                  max="200"
                  value={inputs.hourlyRate}
                  onChange={(e) => handleInputChange('hourlyRate', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$25</span>
                  <span>$200</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Your Knowledge Loss Analysis</h3>
            
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-blue-600 font-medium mb-1">Monthly Meeting Investment</div>
                <div className="text-3xl font-bold text-blue-900">
                  {formatCurrency(results.monthlyMeetingCost)}
                </div>
                <div className="text-sm text-blue-600 mt-1">
                  Total cost of your team's time in meetings
                </div>
              </div>

              <div className="bg-red-50 rounded-lg p-4">
                <div className="text-sm text-red-600 font-medium mb-1">Knowledge Loss (80%)</div>
                <div className="text-3xl font-bold text-red-900">
                  {formatCurrency(results.knowledgeLossCost)}
                </div>
                <div className="text-sm text-red-600 mt-1">
                  Value lost monthly due to poor meeting intelligence
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-sm text-green-600 font-medium mb-1">Potential Monthly Savings</div>
                <div className="text-3xl font-bold text-green-900">
                  {formatCurrency(results.potentialSavings)}
                </div>
                <div className="text-sm text-green-600 mt-1">
                  What you could save with 90% knowledge retention
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 font-medium mb-1">Annual Knowledge Loss</div>
                <div className="text-3xl font-bold text-gray-900">
                  {formatCurrency(results.yearlyLoss)}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Total yearly value lost without meeting intelligence
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={exportResults}
                className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Export Detailed Analysis
              </button>
            </div>
          </div>
        </div>

        {/* Insights Section */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Insights</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 18.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-gray-900">Knowledge Decay</div>
                <div className="text-sm text-gray-600">
                  Research shows 80% of meeting insights are lost within 24 hours without proper capture
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-gray-900">Compounding Returns</div>
                <div className="text-sm text-gray-600">
                  Meeting intelligence builds value over time - every insight captured makes your team smarter
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          box-shadow: 0 0 2px 0 #555;
          transition: background .15s ease-in-out;
        }

        .slider::-webkit-slider-thumb:hover {
          background: #1d4ed8;
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 2px 0 #555;
          transition: background .15s ease-in-out;
        }

        .slider::-moz-range-thumb:hover {
          background: #1d4ed8;
        }
      `}</style>
    </div>
  )
}