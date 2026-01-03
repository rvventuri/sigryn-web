import { Link } from '@tanstack/react-router'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getAllPosts, getFeaturedPosts, type BlogPost } from '../data/posts'

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Card className='group hover:shadow-lg transition-shadow'>
      <CardHeader>
        <div className='flex items-start justify-between gap-4 mb-2'>
          <div className='flex-1'>
            <CardTitle className='text-xl mb-2 group-hover:text-primary transition-colors'>
              <Link to={`/blog/${post.slug}` as any}>
                {post.title}
              </Link>
            </CardTitle>
            <CardDescription className='text-base line-clamp-2'>
              {post.excerpt}
            </CardDescription>
          </div>
        </div>
        <div className='flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-4'>
          <div className='flex items-center gap-1.5'>
            <Calendar className='h-4 w-4' />
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          <div className='flex items-center gap-1.5'>
            <Clock className='h-4 w-4' />
            <span>{post.readTime} min read</span>
          </div>
        </div>
        <div className='flex flex-wrap gap-2 mt-4'>
          {post.tags.map((tag) => (
            <Badge key={tag} variant='secondary' className='text-xs'>
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <Link to={`/blog/${post.slug}` as any}>
          <Button variant='ghost' className='w-full group-hover:bg-primary/10'>
            Read more
            <ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export function BlogList() {
  const featuredPosts = getFeaturedPosts()
  const allPosts = getAllPosts()

  return (
    <div className='container mx-auto px-4 py-16 max-w-6xl'>
      {/* Header */}
      <div className='text-center mb-16'>
        <h1 className='text-4xl md:text-5xl font-bold mb-4'>
          Sigryn Blog
        </h1>
        <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
          Articles about webhooks, system reliability, and best practices
          for event infrastructure
        </p>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className='mb-16'>
          <h2 className='text-2xl font-semibold mb-6'>Featured Articles</h2>
          <div className='grid md:grid-cols-2 gap-6'>
            {featuredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* All Posts */}
      <section>
        <h2 className='text-2xl font-semibold mb-6'>All Articles</h2>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {allPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}

