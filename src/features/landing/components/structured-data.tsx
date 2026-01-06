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
    description: 'Webhook reliability and observability platform. Never lose a webhook again with complete delivery history, automatic retries, and real-time monitoring.',
    sameAs: [
      'https://www.producthunt.com/products/sigryn',
      // Add other social media links here
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      url: baseUrl,
    },
    foundingDate: '2024',
    knowsAbout: [
      'Webhook Infrastructure',
      'Event Delivery',
      'API Integration',
      'Webhook Monitoring',
      'Webhook Reliability',
    ],
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
    description: 'Webhook reliability and observability platform. Solve silent webhook failures with complete delivery history, automatic retries with exponential backoff, signature validation, and real-time alerts.',
    featureList: [
      'Complete webhook delivery history',
      'Automatic retry with exponential backoff',
      'Webhook replay and manual retry',
      'Signature validation (HMAC)',
      'Real-time monitoring and alerts',
      'Multi-destination routing',
      'Webhook observability dashboard',
      'Slack and email notifications',
      'Dead letter queue for failed webhooks',
      'Zero infrastructure required',
    ],
    keywords: 'webhook reliability, webhook observability, webhook monitoring, webhook retry, webhook delivery',
  }

  // WebSite Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Sigryn',
    url: baseUrl,
    description: 'Webhook reliability and observability platform. Never lose a webhook again with complete delivery history, automatic retries, and real-time monitoring.',
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
    mainEntity: {
      '@type': 'SoftwareApplication',
      name: 'Sigryn',
      applicationCategory: 'DeveloperApplication',
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

