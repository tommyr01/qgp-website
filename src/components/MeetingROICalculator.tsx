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
    <div className="my-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Calculate Your Meeting Knowledge Loss
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover how much valuable meeting intelligence your company is losing every month
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Controls Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">Your Meeting Profile</h3>
              <p className="text-gray-600 mt-1">Adjust the sliders to match your company's meeting patterns</p>
            </div>
          </div>
          
          <div className="space-y-8">
            {/* Meetings per week */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700">
                  Meetings per week
                </label>
                <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                  {inputs.meetingsPerWeek}
                </div>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={inputs.meetingsPerWeek}
                  onChange={(e) => handleInputChange('meetingsPerWeek', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb-blue"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>5</span>
                  <span>50</span>
                </div>
              </div>
            </div>

            {/* Average meeting duration */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700">
                  Average meeting duration
                </label>
                <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-green-100 text-green-800 border border-green-200">
                  {inputs.averageDuration} min
                </div>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="15"
                  max="120"
                  value={inputs.averageDuration}
                  onChange={(e) => handleInputChange('averageDuration', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb-green"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>15 min</span>
                  <span>120 min</span>
                </div>
              </div>
            </div>

            {/* Average team size */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700">
                  Average team size
                </label>
                <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-orange-100 text-orange-800 border border-orange-200">
                  {inputs.teamSize} people
                </div>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="3"
                  max="100"
                  value={inputs.teamSize}
                  onChange={(e) => handleInputChange('teamSize', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb-orange"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>3</span>
                  <span>100</span>
                </div>
              </div>
            </div>

            {/* Average hourly rate */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700">
                  Average hourly rate
                </label>
                <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-purple-100 text-purple-800 border border-purple-200">
                  ${inputs.hourlyRate}
                </div>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="25"
                  max="200"
                  value={inputs.hourlyRate}
                  onChange={(e) => handleInputChange('hourlyRate', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb-purple"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>$25</span>
                  <span>$200</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Display Card */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-gray-200 shadow-lg p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">Your Knowledge Loss Analysis</h3>
              <p className="text-gray-600 mt-1">See the real cost of losing meeting intelligence</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Monthly Meeting Investment */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-semibold text-gray-900">Monthly Meeting Investment</h4>
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {formatCurrency(results.monthlyMeetingCost)}
              </div>
              <p className="text-sm text-gray-600">Total cost of your team's time in meetings</p>
            </div>

            {/* Knowledge Loss */}
            <div className="bg-white rounded-xl p-6 border border-red-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-semibold text-gray-900">Knowledge Loss (80%)</h4>
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-red-600 mb-1">
                {formatCurrency(results.knowledgeLossCost)}
              </div>
              <p className="text-sm text-gray-600">Value lost monthly due to poor meeting intelligence</p>
            </div>

            {/* Potential Savings */}
            <div className="bg-white rounded-xl p-6 border border-green-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-semibold text-gray-900">Potential Monthly Savings</h4>
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-1">
                {formatCurrency(results.potentialSavings)}
              </div>
              <p className="text-sm text-gray-600">What you could save with a company brain system</p>
            </div>

            {/* Annual Impact */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-semibold">Annual Knowledge Loss</h4>
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold mb-1">
                {formatCurrency(results.yearlyLoss)}
              </div>
              <p className="text-sm text-white/90">Total annual cost of lost meeting intelligence</p>
            </div>
          </div>

          {/* Export Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={exportResults}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Export Analysis Report
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Custom CSS for styled sliders
const sliderStyles = `
  .slider-thumb-blue::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .slider-thumb-green::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: linear-gradient(135deg, #10b981, #059669);
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .slider-thumb-orange::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: linear-gradient(135deg, #f97316, #ea580c);
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .slider-thumb-purple::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: linear-gradient(135deg, #8b5cf6, #a855f7);
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  /* Firefox */
  .slider-thumb-blue::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .slider-thumb-green::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: linear-gradient(135deg, #10b981, #059669);
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .slider-thumb-orange::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: linear-gradient(135deg, #f97316, #ea580c);
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .slider-thumb-purple::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: linear-gradient(135deg, #8b5cf6, #a855f7);
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = sliderStyles;
  document.head.appendChild(styleElement);
}