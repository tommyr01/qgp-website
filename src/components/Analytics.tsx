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

// Page view tracking component
export default function Analytics() {
  useScrollTracking()

  useEffect(() => {
    trackPageView(window.location.href)
  }, [])

  return null
}