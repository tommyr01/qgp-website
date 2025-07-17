import Script from 'next/script'

interface StructuredDataProps {
  type: 'Article' | 'HowTo'
  data: Record<string, unknown>
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const generateSchema = () => {
    if (type === 'Article') {
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        author: {
          '@type': 'Person',
          name: data.author
        },
        datePublished: data.datePublished,
        dateModified: data.dateModified || data.datePublished,
        publisher: {
          '@type': 'Organization',
          name: 'Quantum Growth Partners',
          logo: {
            '@type': 'ImageObject',
            url: 'https://quantumgrowthpartners.com/logo.png'
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': data.url
        },
        image: data.image
      }
    } else if (type === 'HowTo') {
      return {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: data.title,
        description: data.description,
        image: data.image,
        totalTime: 'PT4W', // 4 weeks
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '99'
        },
        supply: data.supplies || [],
        tool: data.tools || [],
        step: data.steps || []
      }
    }
    return {}
  }

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateSchema())
      }}
    />
  )
}