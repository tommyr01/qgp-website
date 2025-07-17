'use client'

import { useState, useCallback, useEffect } from 'react'
import { trackEvent } from './Analytics'

// TEST DEPLOYMENT: Calculator updated with modern design on 17/07/2025 13:45

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

export default function MeetingROICalculatorModern() {
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

  const calculateROI = useCallback(() => {
    const { meetingsPerWeek, averageDuration, teamSize, hourlyRate } = inputs
    
    // Basic calculations
    const monthlyMeetingHours = (meetingsPerWeek * 4.33) * (averageDuration / 60) * teamSize
    const monthlyMeetingCost = monthlyMeetingHours * hourlyRate
    
    // Knowledge loss calculation (30% of meeting value lost due to poor documentation)
    const knowledgeLossCost = monthlyMeetingCost * 0.3
    
    // Potential savings with AI meeting tools (assuming 80% reduction in knowledge loss)
    const potentialSavings = knowledgeLossCost * 0.8
    
    // Yearly projections
    const yearlyLoss = knowledgeLossCost * 12
    
    setResults({
      monthlyMeetingCost,
      knowledgeLossCost,
      potentialSavings,
      yearlyLoss
    })
  }, [inputs])

  useEffect(() => {
    calculateROI()
  }, [calculateROI])

  const handleInputChange = (field: keyof CalculatorInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }))
    
    // Track analytics
    trackEvent({
      action: 'roi_calculator_input_change',
      category: 'engagement',
      label: `${field}_${value}`,
      value: value
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Meeting ROI Calculator
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Calculate how much your company is losing from undocumented meeting insights and discover your potential savings with AI meeting intelligence.
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Your Meeting Data</h3>
            
            <div className="space-y-6">
              {/* Meetings per Week */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">
                    Meetings per Week
                  </label>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {inputs.meetingsPerWeek}
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={inputs.meetingsPerWeek}
                  onChange={(e) => handleInputChange('meetingsPerWeek', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-blue"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>5</span>
                  <span>50</span>
                </div>
              </div>

              {/* Average Duration */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">
                    Average Duration (minutes)
                  </label>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {inputs.averageDuration}min
                  </span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="120"
                  value={inputs.averageDuration}
                  onChange={(e) => handleInputChange('averageDuration', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-green"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>15min</span>
                  <span>120min</span>
                </div>
              </div>

              {/* Team Size */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">
                    Average Team Size
                  </label>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    {inputs.teamSize} people
                  </span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="25"
                  value={inputs.teamSize}
                  onChange={(e) => handleInputChange('teamSize', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-orange"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>3</span>
                  <span>25</span>
                </div>
              </div>

              {/* Hourly Rate */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">
                    Average Hourly Rate
                  </label>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    ${inputs.hourlyRate}/hr
                  </span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="200"
                  value={inputs.hourlyRate}
                  onChange={(e) => handleInputChange('hourlyRate', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-purple"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$25</span>
                  <span>$200</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {/* Monthly Meeting Cost */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-blue-700 mb-1">Monthly Meeting Cost</h4>
                <p className="text-2xl font-bold text-blue-900">{formatCurrency(results.monthlyMeetingCost)}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>

          {/* Knowledge Loss Cost */}
          <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-red-700 mb-1">Monthly Knowledge Loss</h4>
                <p className="text-2xl font-bold text-red-900">{formatCurrency(results.knowledgeLossCost)}</p>
                <p className="text-xs text-red-600 mt-1">30% of meeting value lost</p>
              </div>
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Potential Savings */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-green-700 mb-1">Potential Monthly Savings</h4>
                <p className="text-2xl font-bold text-green-900">{formatCurrency(results.potentialSavings)}</p>
                <p className="text-xs text-green-600 mt-1">With AI meeting tools</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Yearly Loss */}
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-purple-700 mb-1">Yearly Knowledge Loss</h4>
                <p className="text-2xl font-bold text-purple-900">{formatCurrency(results.yearlyLoss)}</p>
                <p className="text-xs text-purple-600 mt-1">Without AI meeting tools</p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-8 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
          <h3 className="text-xl font-semibold mb-2">Ready to Stop Losing Knowledge?</h3>
          <p className="text-blue-100 mb-4">
            You're potentially losing {formatCurrency(results.yearlyLoss)} per year in undocumented meeting insights.
          </p>
                     <button 
             onClick={() => trackEvent({
               action: 'roi_calculator_cta_click',
               category: 'conversion',
               label: 'meeting_calculator',
               value: Math.round(results.yearlyLoss)
             })}
             className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
           >
            Get Started with AI Meeting Intelligence
          </button>
        </div>
      </div>

      {/* Custom Slider Styles */}
      <style jsx>{`
        .slider-blue::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
        }
        
        .slider-green::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #059669);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
        }
        
        .slider-orange::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f97316, #ea580c);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(249, 115, 22, 0.3);
        }
        
        .slider-purple::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(139, 92, 246, 0.3);
        }
        
        .slider-blue::-moz-range-thumb,
        .slider-green::-moz-range-thumb,
        .slider-orange::-moz-range-thumb,
        .slider-purple::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
        }
        
        .slider-blue::-moz-range-thumb {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        }
        
        .slider-green::-moz-range-thumb {
          background: linear-gradient(135deg, #10b981, #059669);
        }
        
        .slider-orange::-moz-range-thumb {
          background: linear-gradient(135deg, #f97316, #ea580c);
        }
        
        .slider-purple::-moz-range-thumb {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
        }
      `}</style>
    </div>
  )
}