import { createFileRoute } from '@tanstack/react-router'
import { BlogList } from '@/features/blog'
import { Navbar } from '@/features/landing/components/navbar'
import { Footer } from '@/features/landing/components/footer'

export const Route = createFileRoute('/blog/' as any)({
  component: BlogPage,
  head: () => ({
    title: 'Sigryn Blog | Webhook Infrastructure & Reliability Articles',
    meta: [
      {
        name: 'description',
        content:
          'Learn about webhook reliability, observability, and best practices. Articles on webhook infrastructure, debugging, monitoring, and event delivery from the Sigryn team.',
      },
      {
        name: 'keywords',
        content:
          'webhook blog, webhook articles, webhook reliability, webhook infrastructure, webhook best practices, event delivery, webhook monitoring, webhook debugging, webhook observability',
      },
      {
        property: 'og:title',
        content: 'Sigryn Blog | Webhook Infrastructure & Reliability Articles',
      },
      {
        property: 'og:description',
        content:
          'Learn about webhook reliability, observability, and best practices. Articles on webhook infrastructure, debugging, monitoring, and event delivery.',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: 'https://sigryn.com/blog',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: 'Sigryn Blog | Webhook Infrastructure Articles',
      },
      {
        name: 'twitter:description',
        content:
          'Learn about webhook reliability, observability, and best practices from the Sigryn team.',
      },
      {
        name: 'robots',
        content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
    ],
    links: [
      {
        rel: 'canonical',
        href: 'https://sigryn.com/blog',
      },
    ],
  }),
})

function BlogPage() {
  return (
    <div className='flex min-h-screen flex-col bg-background'>
      <Navbar />
      <main className='flex-1'>
        <BlogList />
      </main>
      <Footer />
    </div>
  )
}

