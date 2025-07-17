'use client'

import { useEffect } from 'react'

interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
}

export function trackEvent({ action, category, label, value }: AnalyticsEvent) {
  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as typeof window & { gtag?: Function }).gtag) {
    (window as typeof window & { gtag: Function }).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    })
  }

  // Custom analytics (for future implementation)
  if (typeof window !== 'undefined') {
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action,
        category,
        label,
        value,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
      })
    }).catch(err => console.log('Analytics error:', err))
  }
}

export function trackPageView(url: string) {
  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as typeof window & { gtag?: Function }).gtag) {
    (window as typeof window & { gtag: Function }).gtag('config', 'GA_MEASUREMENT_ID', {
      page_location: url
    })
  }

  // Custom analytics
  trackEvent({
    action: 'page_view',
    category: 'engagement',
    label: url
  })
}

export function trackDownload(fileName: string) {
  trackEvent({
    action: 'download',
    category: 'file_download',
    label: fileName
  })
}

export function trackROICalculation(values: { annualSavings: number }) {
  trackEvent({
    action: 'roi_calculation',
    category: 'engagement',
    label: 'meeting_automation',
    value: values.annualSavings
  })
}

export function trackToolComparison(toolName: string) {
  trackEvent({
    action: 'tool_comparison',
    category: 'engagement',
    label: toolName
  })
}

export function trackEmailCapture(_email: string) {
  trackEvent({
    action: 'email_capture',
    category: 'conversion',
    label: 'newsletter_signup'
  })
}

// Hook for tracking scroll depth
export function useScrollTracking() {
  useEffect(() => {
    let maxScroll = 0
    const trackingPoints = [25, 50, 75, 100]
    const tracked = new Set()

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      )
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent
        
        trackingPoints.forEach(point => {
          if (scrollPercent >= point && !tracked.has(point)) {
            tracked.add(point)
            trackEvent({
              action: 'scroll_depth',
              category: 'engagement',
              label: `${point}%`,
              value: point
            })
          }
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
}

// A/B Testing functionality
export function useABTest(testName: string, variants: string[]) {
  const [variant, setVariant] = useState<string>('')

  useEffect(() => {
    const savedVariant = localStorage.getItem(`ab_test_${testName}`)
    if (savedVariant && variants.includes(savedVariant)) {
      setVariant(savedVariant)
    } else {
      const randomVariant = variants[Math.floor(Math.random() * variants.length)]
      setVariant(randomVariant)
      localStorage.setItem(`ab_test_${testName}`, randomVariant)
      
      // Track A/B test assignment
      trackEvent({
        action: 'ab_test_assigned',
        category: 'experiments',
        label: `${testName}_${randomVariant}`
      })
    }
  }, [testName, variants])

  return variant
}

// Enhanced event tracking for A/B tests
export function trackConversion(testName: string, variant: string, conversionType: string) {
  trackEvent({
    action: 'conversion',
    category: 'experiments',
    label: `${testName}_${variant}_${conversionType}`
  })
}

// Engagement tracking
export function trackEngagement(action: string, details?: Record<string, any>) {
  trackEvent({
    action: `engagement_${action}`,
    category: 'user_behavior',
    label: JSON.stringify(details)
  })
}

// Page view tracking component
export default function Analytics() {
  useScrollTracking()

  useEffect(() => {
    trackPageView(window.location.href)
    
    // Track initial page load time
    const startTime = performance.now()
    window.addEventListener('load', () => {
      const loadTime = performance.now() - startTime
      trackEvent({
        action: 'page_load_time',
        category: 'performance',
        label: 'blog_post',
        value: Math.round(loadTime)
      })
    })
  }, [])

  return null
}