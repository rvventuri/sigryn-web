import { type BlogPost } from '../data/posts'

interface BlogStructuredDataProps {
  post: BlogPost
}

/**
 * Structured Data (JSON-LD) component for Blog Posts
 * Provides Article schema for better SEO and rich snippets
 */
export function BlogStructuredData({ post }: BlogStructuredDataProps) {
  const baseUrl = 'https://sigryn.com'
  const postUrl = `${baseUrl}/blog/${post.slug}`
  const imageUrl = `${baseUrl}/images/og-image.png`

  // Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: imageUrl,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Sigryn',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/favicon.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    articleSection: 'Webhook Infrastructure',
    keywords: post.tags.join(', '),
    timeRequired: `PT${post.readTime}M`,
    inLanguage: 'en-US',
  }

  // BreadcrumbList Schema for Blog Post
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
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${baseUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  }

  // BlogPosting Schema (more specific than Article)
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: imageUrl,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Sigryn',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/favicon.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    keywords: post.tags.join(', '),
    articleSection: 'Webhook Infrastructure',
    timeRequired: `PT${post.readTime}M`,
    inLanguage: 'en-US',
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}

