'use client'

import Link from 'next/link'
import { useABTest, trackConversion } from './Analytics'

interface CTAVariant {
  heading: string
  description: string
  primaryButton: string
  secondaryButton: string
  backgroundColor: string
  textColor: string
}

const ctaVariants: Record<string, CTAVariant> = {
  urgency: {
    heading: "Don't Let Another Meeting Go Undocumented",
    description: "Join 500+ companies already saving 10+ hours per week with automated meeting notes",
    primaryButton: "Start Your Free Trial Now",
    secondaryButton: "See How It Works",
    backgroundColor: "bg-gradient-to-br from-red-600 to-red-700",
    textColor: "text-white"
  },
  benefit: {
    heading: "Transform Your Meeting Workflow Today",
    description: "Download our proven templates and start automating your meetings in under 30 minutes",
    primaryButton: "Get Free Templates",
    secondaryButton: "Book Demo Call",
    backgroundColor: "bg-gradient-to-br from-blue-600 to-indigo-700",
    textColor: "text-white"
  },
  social_proof: {
    heading: "Join 500+ Teams Already Saving Time",
    description: "See why operations managers at TechStart, Growth Agency, and ScaleUp chose our solution",
    primaryButton: "Download Templates",
    secondaryButton: "Read Case Studies",
    backgroundColor: "bg-gradient-to-br from-green-600 to-green-700",
    textColor: "text-white"
  }
}

export default function ABTestCTA() {
  const variant = useABTest('cta_test', ['urgency', 'benefit', 'social_proof'])
  
  if (!variant) return null
  
  const currentVariant = ctaVariants[variant]

  const handlePrimaryClick = () => {
    trackConversion('cta_test', variant, 'primary_button')
  }

  const handleSecondaryClick = () => {
    trackConversion('cta_test', variant, 'secondary_button')
  }

  return (
    <section className={`section ${currentVariant.backgroundColor} ${currentVariant.textColor}`}>
      <div className="container-default w-container">
        <div className="inner-container _640px center text-center">
          <h2 className="heading-h2-size text-white mg-bottom-24px">
            {currentVariant.heading}
          </h2>
          <p className="paragraph-large text-white/90 mg-bottom-32px">
            {currentVariant.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handlePrimaryClick}
              className="btn-secondary large bg-white text-gray-900 hover:bg-gray-100 font-semibold"
            >
              {currentVariant.primaryButton}
            </button>
            <Link 
              href="/contact" 
              onClick={handleSecondaryClick}
              className="btn-secondary large border-white text-white hover:bg-white/10"
            >
              {currentVariant.secondaryButton}
            </Link>
          </div>
          
          {/* Trust indicators for social proof variant */}
          {variant === 'social_proof' && (
            <div className="mt-8 flex justify-center items-center gap-8 opacity-80">
              <div className="text-sm">
                <div className="font-semibold">500+</div>
                <div>Companies</div>
              </div>
              <div className="text-sm">
                <div className="font-semibold">10+ hrs</div>
                <div>Saved/Week</div>
              </div>
              <div className="text-sm">
                <div className="font-semibold">92%</div>
                <div>Success Rate</div>
              </div>
            </div>
          )}
          
          {/* Urgency indicator for urgency variant */}
          {variant === 'urgency' && (
            <div className="mt-6 text-sm opacity-90">
              <div className="inline-flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <span>Limited time: Free setup consultation included</span>
              </div>
            </div>
          )}
          
          {/* Benefit highlight for benefit variant */}
          {variant === 'benefit' && (
            <div className="mt-6 text-sm opacity-90">
              <div className="inline-flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>No credit card required • 14-day free trial</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}