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

// Modern Card Component (using project's design system)
function Card({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

function CardHeader({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={`flex flex-col space-y-1.5 p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

function CardContent({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={`p-6 pt-0 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

function CardTitle({ className, children, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={`text-2xl font-semibold leading-none tracking-tight text-gray-900 ${className}`}
      {...props}
    >
      {children}
    </h3>
  )
}

function CardDescription({ className, children, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={`text-sm text-gray-600 ${className}`}
      {...props}
    >
      {children}
    </p>
  )
}

// Modern Badge Component
function Badge({ className, variant = "default", children, ...props }: React.ComponentProps<"span"> & { variant?: "default" | "secondary" | "destructive" | "outline" }) {
  const variants = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    outline: "text-gray-700 border border-gray-300 hover:bg-gray-50"
  }

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}

// Modern Slider Component
function Slider({ value, onValueChange, min = 0, max = 100, step = 1, className, ...props }: {
  value: number[]
  onValueChange: (value: number[]) => void
  min?: number
  max?: number
  step?: number
  className?: string
}) {
  return (
    <div className={`relative flex w-full touch-none select-none items-center ${className}`}>
      <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-blue-100">
        <div
          className="absolute h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
          style={{
            width: `${((value[0] - min) / (max - min)) * 100}%`
          }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0]}
        onChange={(e) => onValueChange([parseInt(e.target.value)])}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        {...props}
      />
      <div
        className="absolute block h-5 w-5 rounded-full border-2 border-blue-500 bg-white shadow-lg transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
        style={{
          left: `${((value[0] - min) / (max - min)) * 100}%`,
          transform: 'translateX(-50%)'
        }}
      />
    </div>
  )
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

  const [hasCalculated, setHasCalculated] = useState(false)

  const calculateROI = useCallback(() => {
    const { meetingsPerWeek, averageDuration, teamSize, hourlyRate } = inputs
    
    const hoursPerMeeting = averageDuration / 60
    const monthlyMeetingHours = meetingsPerWeek * hoursPerMeeting * 4.33
    const monthlyMeetingCost = monthlyMeetingHours * teamSize * hourlyRate
    const knowledgeLossCost = monthlyMeetingCost * 0.8
    const potentialSavings = monthlyMeetingCost * 0.9 - monthlyMeetingCost * 0.2
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
        `Lindy.ai could save ${formatCurrency(results.potentialSavings)} monthly`,
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
    <div className="my-16 mx-auto max-w-7xl px-6 py-12 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 rounded-3xl shadow-xl border border-blue-100">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Calculate Your Meeting Knowledge Loss
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover how much valuable meeting intelligence your company is losing every month
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              Your Meeting Profile
            </CardTitle>
            <CardDescription>
              Adjust the sliders to match your company's meeting patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Meetings per week */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Meetings per week</label>
                  <Badge variant="secondary">{inputs.meetingsPerWeek}</Badge>
                </div>
                <Slider
                  value={[inputs.meetingsPerWeek]}
                  onValueChange={(value) => handleInputChange('meetingsPerWeek', value[0])}
                  min={5}
                  max={50}
                  step={1}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>5</span>
                  <span>50</span>
                </div>
              </div>

              {/* Average duration */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Average meeting duration</label>
                  <Badge variant="secondary">{inputs.averageDuration} min</Badge>
                </div>
                <Slider
                  value={[inputs.averageDuration]}
                  onValueChange={(value) => handleInputChange('averageDuration', value[0])}
                  min={15}
                  max={120}
                  step={5}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>15 min</span>
                  <span>120 min</span>
                </div>
              </div>

              {/* Team size */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Average team size</label>
                  <Badge variant="secondary">{inputs.teamSize} people</Badge>
                </div>
                <Slider
                  value={[inputs.teamSize]}
                  onValueChange={(value) => handleInputChange('teamSize', value[0])}
                  min={3}
                  max={100}
                  step={1}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>3</span>
                  <span>100</span>
                </div>
              </div>

              {/* Hourly rate */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Average hourly rate</label>
                  <Badge variant="secondary">${inputs.hourlyRate}</Badge>
                </div>
                <Slider
                  value={[inputs.hourlyRate]}
                  onValueChange={(value) => handleInputChange('hourlyRate', value[0])}
                  min={25}
                  max={200}
                  step={5}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>$25</span>
                  <span>$200</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Display */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              Your Knowledge Loss Analysis
            </CardTitle>
            <CardDescription>
              See the real cost of losing meeting intelligence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Monthly Investment */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-900">Monthly Meeting Investment</p>
                    <p className="text-2xl font-bold text-blue-900">{formatCurrency(results.monthlyMeetingCost)}</p>
                  </div>
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                </div>
                <p className="text-sm text-blue-700 mt-2">Total cost of your team's time in meetings</p>
              </div>

              {/* Knowledge Loss */}
              <div className="p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border border-red-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-900">Knowledge Loss (80%)</p>
                    <p className="text-2xl font-bold text-red-900">{formatCurrency(results.knowledgeLossCost)}</p>
                  </div>
                  <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 18.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                </div>
                <p className="text-sm text-red-700 mt-2">Value lost monthly due to poor meeting intelligence</p>
              </div>

              {/* Potential Savings */}
              <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-900">Potential Monthly Savings</p>
                    <p className="text-2xl font-bold text-green-900">{formatCurrency(results.potentialSavings)}</p>
                  </div>
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
                <p className="text-sm text-green-700 mt-2">What you could save with Lindy's AI intelligence</p>
              </div>

              {/* Annual Loss */}
              <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Annual Knowledge Loss</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(results.yearlyLoss)}</p>
                  </div>
                  <div className="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-2">Total yearly value lost without meeting intelligence</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={exportResults}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 h-12 px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
              >
                Export Detailed Analysis
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-lg">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 18.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              The Problem: Knowledge Decay
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Research shows 80% of meeting insights are lost within 24 hours without proper capture. Your team is losing valuable intelligence every single day.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-lg">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              The Solution: Lindy.ai
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Lindy.ai captures 90%+ of meeting intelligence and builds value over time. Every insight captured makes your team smarter and more efficient.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}