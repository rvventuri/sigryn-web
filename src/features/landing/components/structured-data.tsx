/**
 * Structured Data (JSON-LD) component for SEO
 * Provides schema.org markup for better search engine understanding
 */
export function StructuredData() {
  const baseUrl = 'https://sigryn.com'
  
  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Sigryn',
    url: baseUrl,
    logo: `${baseUrl}/images/favicon.svg`,
    description: 'The control layer for reliable event delivery. Sigryn processes signals, validates signatures, and guarantees every event reaches its destination.',
    sameAs: [
      'https://www.producthunt.com/products/sigryn',
      // Add other social media links here
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      url: baseUrl,
    },
  }

  // SoftwareApplication Schema
  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Sigryn',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      priceValidUntil: '2025-12-31',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '1',
    },
    description: 'Sigryn is the control layer for reliable event delivery. Process webhooks, validate signatures, queue events, and guarantee delivery with enterprise-grade reliability.',
    featureList: [
      'Webhook queueing and retry',
      'Event delivery guarantee',
      'Signature validation',
      'Multi-destination routing',
      'Real-time monitoring',
      'Event replay',
      'Local development support',
      'Infrastructure as code',
    ],
  }

  // WebSite Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Sigryn',
    url: baseUrl,
    description: 'The control layer for reliable event delivery. Never lose a webhook again.',
    publisher: {
      '@type': 'Organization',
      name: 'Sigryn',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}

