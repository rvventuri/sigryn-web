import { createFileRoute } from '@tanstack/react-router'
import { BlogPost } from '@/features/blog'
import { Navbar } from '@/features/landing/components/navbar'
import { Footer } from '@/features/landing/components/footer'
import { getPostBySlug } from '@/features/blog/data/posts'

export const Route = createFileRoute('/blog/$slug' as any)({
  component: BlogPostPage,
  loader: async ({ params }) => {
    const post = getPostBySlug(params.slug as string)
    if (!post) {
      throw new Error('Post not found')
    }
    return { post }
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post
    if (!post) {
      return {
        title: 'Blog Post Not Found | Sigryn',
      }
    }

    const baseUrl = 'https://sigryn.com'
    const postUrl = `${baseUrl}/blog/${post.slug}`
    const imageUrl = `${baseUrl}/images/og-image.png`

    return {
      title: `${post.title} | Sigryn Blog`,
      meta: [
        {
          name: 'description',
          content: post.excerpt,
        },
        {
          name: 'keywords',
          content: post.tags.join(', '),
        },
        {
          property: 'og:title',
          content: post.title,
        },
        {
          property: 'og:description',
          content: post.excerpt,
        },
        {
          property: 'og:type',
          content: 'article',
        },
        {
          property: 'og:url',
          content: postUrl,
        },
        {
          property: 'og:image',
          content: imageUrl,
        },
        {
          property: 'article:published_time',
          content: post.publishedAt,
        },
        {
          property: 'article:author',
          content: post.author.name,
        },
        {
          property: 'article:section',
          content: 'Webhook Infrastructure',
        },
        {
          property: 'article:tag',
          content: post.tags.join(', '),
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:title',
          content: post.title,
        },
        {
          name: 'twitter:description',
          content: post.excerpt,
        },
        {
          name: 'twitter:image',
          content: imageUrl,
        },
        {
          name: 'robots',
          content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        },
      ],
      links: [
        {
          rel: 'canonical',
          href: postUrl,
        },
      ],
    }
  },
})

function BlogPostPage() {
  const params = Route.useParams() as { slug: string }

  return (
    <div className='flex min-h-screen flex-col bg-background'>
      <Navbar />
      <main className='flex-1'>
        <BlogPost slug={params.slug} />
      </main>
      <Footer />
    </div>
  )
}

