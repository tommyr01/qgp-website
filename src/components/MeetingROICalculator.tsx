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
    <div className="my-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-xl border shadow-sm p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-xl mb-6">
            <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-semibold mb-4">
            Calculate Your Meeting Knowledge Loss
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how much valuable meeting intelligence your company is losing every month
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Controls */}
          <div className="bg-card text-card-foreground rounded-xl border shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Your Meeting Profile</h3>
            </div>
            
            <div className="space-y-8">
              <div className="group">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Meetings per week: 
                  <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    {inputs.meetingsPerWeek}
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={inputs.meetingsPerWeek}
                    onChange={(e) => handleInputChange('meetingsPerWeek', parseInt(e.target.value))}
                    className="w-full h-3 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full appearance-none cursor-pointer slider-modern"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>5</span>
                    <span>50</span>
                  </div>
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Average meeting duration: 
                  <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-green-500 to-teal-500 text-white">
                    {inputs.averageDuration} min
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="15"
                    max="120"
                    value={inputs.averageDuration}
                    onChange={(e) => handleInputChange('averageDuration', parseInt(e.target.value))}
                    className="w-full h-3 bg-gradient-to-r from-green-200 to-teal-200 rounded-full appearance-none cursor-pointer slider-modern"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>15 min</span>
                    <span>120 min</span>
                  </div>
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Average team size: 
                  <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-orange-500 to-red-500 text-white">
                    {inputs.teamSize} people
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="3"
                    max="100"
                    value={inputs.teamSize}
                    onChange={(e) => handleInputChange('teamSize', parseInt(e.target.value))}
                    className="w-full h-3 bg-gradient-to-r from-orange-200 to-red-200 rounded-full appearance-none cursor-pointer slider-modern"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>3</span>
                    <span>100</span>
                  </div>
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Average hourly rate: 
                  <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    ${inputs.hourlyRate}
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="25"
                    max="200"
                    value={inputs.hourlyRate}
                    onChange={(e) => handleInputChange('hourlyRate', parseInt(e.target.value))}
                    className="w-full h-3 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full appearance-none cursor-pointer slider-modern"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>$25</span>
                    <span>$200</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Your Knowledge Loss Analysis</h3>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium opacity-90">Monthly Meeting Investment</div>
                </div>
                <div className="text-4xl font-bold mb-2">
                  {formatCurrency(results.monthlyMeetingCost)}
                </div>
                <div className="text-sm opacity-80">
                  Total cost of your team's time in meetings
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 18.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium opacity-90">Knowledge Loss (80%)</div>
                </div>
                <div className="text-4xl font-bold mb-2">
                  {formatCurrency(results.knowledgeLossCost)}
                </div>
                <div className="text-sm opacity-80">
                  Value lost monthly due to poor meeting intelligence
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium opacity-90">Potential Monthly Savings</div>
                </div>
                <div className="text-4xl font-bold mb-2">
                  {formatCurrency(results.potentialSavings)}
                </div>
                <div className="text-sm opacity-80">
                  What you could save with Lindy's AI intelligence
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium opacity-90">Annual Knowledge Loss</div>
                </div>
                <div className="text-4xl font-bold mb-2">
                  {formatCurrency(results.yearlyLoss)}
                </div>
                <div className="text-sm opacity-80">
                  Total yearly value lost without meeting intelligence
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={exportResults}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-2xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Export Detailed Analysis
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Insights Section */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Key Insights</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border border-red-100">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 18.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg mb-2">Knowledge Decay</div>
                  <div className="text-gray-700">
                    Research shows 80% of meeting insights are lost within 24 hours without proper capture
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg mb-2">Lindy's Solution</div>
                  <div className="text-gray-700">
                    Lindy.ai captures 90%+ of meeting intelligence and builds value over time - every insight makes your team smarter
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider-modern::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #8b5cf6, #a855f7);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
          transition: all 0.3s ease;
          border: 3px solid white;
        }

        .slider-modern::-webkit-slider-thumb:hover {
          background: linear-gradient(45deg, #7c3aed, #9333ea);
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
        }

        .slider-modern::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #8b5cf6, #a855f7);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
          transition: all 0.3s ease;
        }

        .slider-modern::-moz-range-thumb:hover {
          background: linear-gradient(45deg, #7c3aed, #9333ea);
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
        }

        .slider-modern::-webkit-slider-track {
          height: 12px;
          border-radius: 6px;
        }

        .slider-modern::-moz-range-track {
          height: 12px;
          border-radius: 6px;
        }
      `}</style>
    </div>
  )
}