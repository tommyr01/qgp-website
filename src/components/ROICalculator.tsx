'use client'

import { useState, useEffect, useCallback } from 'react'
import { trackROICalculation } from './Analytics'

interface CalculationResults {
  weeklyTimeSaved: number
  monthlyCostSavings: number
  annualSavings: number
  breakEvenDays: number
  efficiencyGain: number
}

export default function ROICalculator() {
  const [inputs, setInputs] = useState({
    weeklyMeetings: 15,
    avgMeetingDuration: 45,
    followUpTimePerMeeting: 30,
    teamSize: 10,
    avgHourlyRate: 75,
    toolCost: 99
  })

  const [results, setResults] = useState<CalculationResults | null>(null)
  const [showResults, setShowResults] = useState(false)

  const calculateROI = useCallback(() => {
    const weeklyMeetingTime = inputs.weeklyMeetings * inputs.avgMeetingDuration / 60
    const weeklyFollowUpTime = inputs.weeklyMeetings * inputs.followUpTimePerMeeting / 60
    const totalWeeklyTime = weeklyFollowUpTime
    const weeklyTimeSaved = totalWeeklyTime * 0.85 // 85% time savings
    
    const weeklyCostSavings = weeklyTimeSaved * inputs.avgHourlyRate * inputs.teamSize
    const monthlyCostSavings = weeklyCostSavings * 4.33
    const annualSavings = monthlyCostSavings * 12
    const breakEvenDays = (inputs.toolCost / (weeklyCostSavings / 7))
    const efficiencyGain = (weeklyTimeSaved / (weeklyMeetingTime + weeklyFollowUpTime)) * 100

    const calculationResults = {
      weeklyTimeSaved,
      monthlyCostSavings,
      annualSavings,
      breakEvenDays: Math.ceil(breakEvenDays),
      efficiencyGain: Math.round(efficiencyGain)
    }

    setResults(calculationResults)
    setShowResults(true)
    
    // Track analytics
    trackROICalculation(calculationResults)
  }, [inputs])

  useEffect(() => {
    if (showResults) {
      calculateROI()
    }
  }, [inputs, showResults, calculateROI])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  return (
    <div className="my-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">Calculate Your ROI</h2>
        <p className="text-center text-gray-600 mb-8">
          See how much time and money you can save with meeting automation
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Your Current Situation</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weekly meetings
                </label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={inputs.weeklyMeetings}
                  onChange={(e) => setInputs({...inputs, weeklyMeetings: parseInt(e.target.value)})}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>5</span>
                  <span className="font-semibold">{inputs.weeklyMeetings} meetings</span>
                  <span>50</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Average meeting duration (minutes)
                </label>
                <input
                  type="range"
                  min="15"
                  max="120"
                  step="15"
                  value={inputs.avgMeetingDuration}
                  onChange={(e) => setInputs({...inputs, avgMeetingDuration: parseInt(e.target.value)})}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>15</span>
                  <span className="font-semibold">{inputs.avgMeetingDuration} min</span>
                  <span>120</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Follow-up time per meeting (minutes)
                </label>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="5"
                  value={inputs.followUpTimePerMeeting}
                  onChange={(e) => setInputs({...inputs, followUpTimePerMeeting: parseInt(e.target.value)})}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>10</span>
                  <span className="font-semibold">{inputs.followUpTimePerMeeting} min</span>
                  <span>60</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Team size
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={inputs.teamSize}
                  onChange={(e) => setInputs({...inputs, teamSize: parseInt(e.target.value)})}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>1</span>
                  <span className="font-semibold">{inputs.teamSize} people</span>
                  <span>50</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Average hourly rate
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    min="20"
                    max="500"
                    value={inputs.avgHourlyRate}
                    onChange={(e) => setInputs({...inputs, avgHourlyRate: parseInt(e.target.value) || 0})}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                onClick={calculateROI}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Calculate Savings
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Your Potential Savings</h3>
            
            {!showResults ? (
              <div className="flex items-center justify-center h-full text-gray-400">
                <div className="text-center">
                  <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <p>Click &quot;Calculate Savings&quot; to see your results</p>
                </div>
              </div>
            ) : results && (
              <div className="space-y-6">
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="text-3xl font-bold text-green-700">
                    {formatCurrency(results.annualSavings)}
                  </div>
                  <div className="text-sm text-green-600 mt-1">Annual savings</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-xl font-semibold text-gray-800">
                      {results.weeklyTimeSaved.toFixed(1)} hrs/week
                    </div>
                    <div className="text-sm text-gray-600">Time saved</div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-xl font-semibold text-gray-800">
                      {results.efficiencyGain}%
                    </div>
                    <div className="text-sm text-gray-600">Efficiency gain</div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="text-xl font-semibold text-blue-700">
                    {results.breakEvenDays} days
                  </div>
                  <div className="text-sm text-blue-600">Time to break even</div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">What this means:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Save {formatCurrency(results.monthlyCostSavings)} every month</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Reclaim {(results.weeklyTimeSaved * 52).toFixed(0)} hours per year</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>ROI in less than {Math.ceil(results.breakEvenDays / 7)} weeks</span>
                    </li>
                  </ul>
                </div>

                <button className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
                  Get Started Today
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}