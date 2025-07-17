'use client'

import { useState, useCallback, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Slider } from './ui/slider'
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

export default function ROICalculatorShadcn() {
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

  const handleInputChange = (field: keyof CalculatorInputs, value: number[]) => {
    setInputs(prev => ({ ...prev, [field]: value[0] }))
    
    // Track analytics
    trackEvent({
      action: 'roi_calculator_input_change',
      category: 'engagement',
      label: `${field}_${value[0]}`,
      value: value[0]
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
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">
          Calculate Your Meeting ROI
        </h2>
        <p className="text-muted-foreground">
          Discover how much you could save with AI-powered meeting intelligence
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Your Meeting Data</CardTitle>
            <CardDescription>
              Adjust the sliders to match your current meeting patterns
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Meetings per Week */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  Meetings per Week
                </label>
                <span className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm font-medium">
                  {inputs.meetingsPerWeek}
                </span>
              </div>
              <Slider
                value={[inputs.meetingsPerWeek]}
                onValueChange={(value) => handleInputChange('meetingsPerWeek', value)}
                max={50}
                min={5}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>5</span>
                <span>50</span>
              </div>
            </div>

            {/* Average Duration */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  Average Duration (minutes)
                </label>
                <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm font-medium">
                  {inputs.averageDuration}min
                </span>
              </div>
              <Slider
                value={[inputs.averageDuration]}
                onValueChange={(value) => handleInputChange('averageDuration', value)}
                max={120}
                min={15}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>15min</span>
                <span>120min</span>
              </div>
            </div>

            {/* Team Size */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  Average Team Size
                </label>
                <span className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-sm font-medium">
                  {inputs.teamSize} people
                </span>
              </div>
              <Slider
                value={[inputs.teamSize]}
                onValueChange={(value) => handleInputChange('teamSize', value)}
                max={25}
                min={3}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>3</span>
                <span>25</span>
              </div>
            </div>

            {/* Hourly Rate */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  Average Hourly Rate
                </label>
                <span className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-sm font-medium">
                  ${inputs.hourlyRate}/hr
                </span>
              </div>
              <Slider
                value={[inputs.hourlyRate]}
                onValueChange={(value) => handleInputChange('hourlyRate', value)}
                max={200}
                min={25}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$25</span>
                <span>$200</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="space-y-4">
          {/* Monthly Meeting Cost */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Meeting Cost</p>
                  <p className="text-2xl font-bold">{formatCurrency(results.monthlyMeetingCost)}</p>
                </div>
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Knowledge Loss Cost */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Knowledge Loss</p>
                  <p className="text-2xl font-bold text-destructive">{formatCurrency(results.knowledgeLossCost)}</p>
                  <p className="text-xs text-muted-foreground">30% of meeting value lost</p>
                </div>
                <div className="w-12 h-12 bg-destructive rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Potential Savings */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Potential Monthly Savings</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(results.potentialSavings)}</p>
                  <p className="text-xs text-muted-foreground">With AI meeting tools</p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Yearly Loss */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Yearly Knowledge Loss</p>
                  <p className="text-2xl font-bold text-purple-600">{formatCurrency(results.yearlyLoss)}</p>
                  <p className="text-xs text-muted-foreground">Without AI meeting tools</p>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom CTA */}
      <Card className="mt-8">
        <CardContent className="pt-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Ready to Stop Losing Knowledge?</h3>
          <p className="text-muted-foreground mb-4">
            You're potentially losing {formatCurrency(results.yearlyLoss)} per year in undocumented meeting insights.
          </p>
          <Button 
            size="lg"
            onClick={() => trackEvent({
              action: 'roi_calculator_cta_click',
              category: 'conversion',
              label: 'meeting_calculator',
              value: Math.round(results.yearlyLoss)
            })}
          >
            Get Started with AI Meeting Intelligence
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}