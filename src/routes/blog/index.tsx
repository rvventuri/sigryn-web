import { createFileRoute } from '@tanstack/react-router'
import { BlogList } from '@/features/blog'
import { Navbar } from '@/features/landing/components/navbar'
import { Footer } from '@/features/landing/components/footer'

export const Route = createFileRoute('/blog/' as any)({
  component: BlogPage,
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

