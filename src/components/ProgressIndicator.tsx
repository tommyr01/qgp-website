'use client'

import { useState, useEffect } from 'react'

interface Step {
  id: string
  title: string
  description: string
  estimatedTime: string
  completed: boolean
}

const steps: Step[] = [
  {
    id: 'choose-platform',
    title: 'Choose Platform',
    description: 'Select the right automation tool for your needs',
    estimatedTime: '5 min',
    completed: false
  },
  {
    id: 'setup-detection',
    title: 'Setup Detection',
    description: 'Configure calendar integration and meeting detection',
    estimatedTime: '10 min',
    completed: false
  },
  {
    id: 'configure-ai',
    title: 'Configure AI',
    description: 'Set up transcription and summarization',
    estimatedTime: '15 min',
    completed: false
  },
  {
    id: 'build-repository',
    title: 'Build Repository',
    description: 'Create your knowledge base structure',
    estimatedTime: '20 min',
    completed: false
  },
  {
    id: 'automate-communication',
    title: 'Automate Communication',
    description: 'Set up team notifications and updates',
    estimatedTime: '10 min',
    completed: false
  },
  {
    id: 'measure-roi',
    title: 'Measure ROI',
    description: 'Track and optimize your automation',
    estimatedTime: '5 min',
    completed: false
  }
]

export default function ProgressIndicator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2
      const sections = ['choose-platform', 'setup-detection', 'configure-ai', 'build-repository', 'automate-communication', 'measure-roi']
      
      for (let i = 0; i < sections.length; i++) {
        const element = document.getElementById(sections[i])
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + window.scrollY
          
          if (scrollPosition >= elementTop) {
            setCurrentStep(i)
            
            // Mark previous steps as completed
            const newCompletedSteps = sections.slice(0, i + 1)
            setCompletedSteps(newCompletedSteps)
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const totalTime = steps.reduce((total, step) => {
    const time = parseInt(step.estimatedTime.replace(' min', ''))
    return total + time
  }, 0)

  const completedTime = steps
    .filter(step => completedSteps.includes(step.id))
    .reduce((total, step) => {
      const time = parseInt(step.estimatedTime.replace(' min', ''))
      return total + time
    }, 0)

  return (
    <div className="my-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Implementation Progress</h3>
          <p className="text-gray-600">
            Follow along with our step-by-step guide • {completedTime}/{totalTime} minutes
          </p>
        </div>

        {/* Overall Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm text-gray-600">
              {Math.round((completedSteps.length / steps.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300"></div>
          <div 
            className="absolute left-6 top-0 w-0.5 bg-blue-500 transition-all duration-500"
            style={{ 
              height: `${((currentStep + 1) / steps.length) * 100}%`
            }}
          ></div>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={step.id} className="relative flex items-start">
                {/* Step Circle */}
                <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                  completedSteps.includes(step.id)
                    ? 'bg-green-500 border-green-500 text-white'
                    : index === currentStep
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  {completedSteps.includes(step.id) ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </div>

                {/* Step Content */}
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-lg font-semibold transition-colors duration-300 ${
                      completedSteps.includes(step.id)
                        ? 'text-green-600'
                        : index === currentStep
                        ? 'text-blue-600'
                        : 'text-gray-700'
                    }`}>
                      {step.title}
                    </h4>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {step.estimatedTime}
                    </span>
                  </div>
                  <p className={`text-sm mt-1 transition-colors duration-300 ${
                    completedSteps.includes(step.id)
                      ? 'text-green-700'
                      : index === currentStep
                      ? 'text-blue-700'
                      : 'text-gray-600'
                  }`}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-4 bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm">
              <div className="text-gray-600">Steps Completed</div>
              <div className="font-semibold text-gray-800">{completedSteps.length}/{steps.length}</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-sm">
              <div className="text-gray-600">Time Invested</div>
              <div className="font-semibold text-gray-800">{completedTime} minutes</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-sm">
              <div className="text-gray-600">Time Remaining</div>
              <div className="font-semibold text-gray-800">{totalTime - completedTime} minutes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}