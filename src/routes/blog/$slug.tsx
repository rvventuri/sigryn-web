import { createFileRoute } from '@tanstack/react-router'
import { BlogPost } from '@/features/blog'
import { Navbar } from '@/features/landing/components/navbar'
import { Footer } from '@/features/landing/components/footer'

export const Route = createFileRoute('/blog/$slug' as any)({
  component: BlogPostPage,
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

