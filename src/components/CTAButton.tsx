'use client'

import { trackEvent } from './Analytics'

interface CTAButtonProps {
  href: string
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary'
}

export default function CTAButton({ href, children, className = '', variant = 'primary' }: CTAButtonProps) {
  const handleClick = () => {
    trackEvent({
      action: 'cta_click',
      category: 'conversion',
      label: href
    })
    window.open(href, '_blank')
  }

  const baseClasses = variant === 'primary' 
    ? 'btn-secondary large bg-white text-purple-700 hover:bg-gray-100 font-semibold'
    : 'btn-secondary large border-white text-white hover:bg-white/10'

  return (
    <button 
      onClick={handleClick}
      className={`${baseClasses} ${className}`}
    >
      {children}
    </button>
  )
}