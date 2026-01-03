import React, { useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { Calendar, Clock, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'
import { getPostBySlug, getAllPosts, type BlogPost } from '../data/posts'
import { blogEvents } from '@/lib/analytics'

function formatMarkdown(content: string): React.ReactNode[] {
  // Simple markdown to JSX converter
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let currentParagraph: (string | React.ReactNode)[] = []
  let inCodeBlock = false
  let codeBlockContent: string[] = []
  let codeLanguage = ''

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.map((item) =>
        typeof item === 'string' ? item : String(item)
      ).join(' ')
      if (text.trim()) {
        elements.push(
          <p key={`p-${elements.length}`} className='mb-4 leading-7'>
            {currentParagraph.map((item, idx) =>
              typeof item === 'string' ? item : <React.Fragment key={idx}>{item}</React.Fragment>
            )}
          </p>
        )
      }
      currentParagraph = []
    }
  }

  const flushCodeBlock = () => {
    if (codeBlockContent.length > 0) {
      elements.push(
        <pre
          key={`code-${elements.length}`}
          className='bg-muted p-4 rounded-lg overflow-x-auto mb-4'
        >
          <code className={codeLanguage ? `language-${codeLanguage}` : ''}>
            {codeBlockContent.join('\n')}
          </code>
        </pre>
      )
      codeBlockContent = []
      codeLanguage = ''
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Code blocks
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        flushCodeBlock()
        inCodeBlock = false
      } else {
        flushParagraph()
        codeLanguage = line.slice(3).trim()
        inCodeBlock = true
      }
      continue
    }

    if (inCodeBlock) {
      codeBlockContent.push(line)
      continue
    }

    // Headers
    if (line.startsWith('# ')) {
      flushParagraph()
      elements.push(
        <h1 key={`h1-${elements.length}`} className='text-3xl font-bold mt-8 mb-4'>
          {line.slice(2)}
        </h1>
      )
      continue
    }
    if (line.startsWith('## ')) {
      flushParagraph()
      elements.push(
        <h2 key={`h2-${elements.length}`} className='text-2xl font-semibold mt-6 mb-3'>
          {line.slice(3)}
        </h2>
      )
      continue
    }
    if (line.startsWith('### ')) {
      flushParagraph()
      elements.push(
        <h3 key={`h3-${elements.length}`} className='text-xl font-semibold mt-4 mb-2'>
          {line.slice(4)}
        </h3>
      )
      continue
    }

    // Lists
    if (line.startsWith('- ') || line.startsWith('* ')) {
      flushParagraph()
      const listItems: string[] = []
      let j = i
      while (j < lines.length && (lines[j].startsWith('- ') || lines[j].startsWith('* '))) {
        listItems.push(lines[j].slice(2))
        j++
      }
      i = j - 1
      elements.push(
        <ul key={`ul-${elements.length}`} className='list-disc list-inside mb-4 space-y-2 ml-4'>
          {listItems.map((item, idx) => {
            // Process bold text in list items
            const parts = item.split('**')
            const itemContent: React.ReactNode[] = []
            for (let k = 0; k < parts.length; k++) {
              if (k % 2 === 1) {
                itemContent.push(<strong key={`bold-${idx}-${k}`}>{parts[k]}</strong>)
              } else if (parts[k]) {
                itemContent.push(parts[k])
              }
            }
            return (
              <li key={idx} className='leading-7'>
                {itemContent}
              </li>
            )
          })}
        </ul>
      )
      continue
    }

    // Bold - process bold text in regular lines
    if (line.includes('**')) {
      const parts = line.split('**')
      for (let j = 0; j < parts.length; j++) {
        if (j % 2 === 1) {
          currentParagraph.push(<strong key={`bold-${i}-${j}`}>{parts[j]}</strong>)
        } else if (parts[j]) {
          currentParagraph.push(parts[j])
        }
      }
      continue
    }

    // Empty line
    if (line.trim() === '') {
      flushParagraph()
      continue
    }

    currentParagraph.push(line)
  }

  flushParagraph()
  flushCodeBlock()

  return elements
}

export function BlogPost({ slug }: { slug: string }) {
  const post = getPostBySlug(slug)
  const allPosts = getAllPosts()
  const currentIndex = allPosts.findIndex((p) => p.slug === slug)
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const prevPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

  if (!post) {
    return (
      <div className='container mx-auto px-4 py-16 max-w-4xl text-center'>
        <h1 className='text-3xl font-bold mb-4'>Post not found</h1>
        <p className='text-muted-foreground mb-8'>
          The article you're looking for doesn't exist.
        </p>
        <Link to={'/blog' as any}>
          <Button>Back to blog</Button>
        </Link>
      </div>
    )
  }

  const content = formatMarkdown(post.content)

  useEffect(() => {
    blogEvents.postView(slug, post.title)
  }, [slug, post.title])

  return (
    <article className='container mx-auto px-4 py-16 max-w-4xl'>
      {/* Back button */}
      <Link to={'/blog' as any}>
        <Button variant='ghost' className='mb-8'>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back to blog
        </Button>
      </Link>

      {/* Header */}
      <header className='mb-8'>
        <h1 className='text-4xl md:text-5xl font-bold mb-4'>{post.title}</h1>
        <p className='text-xl text-muted-foreground mb-6'>{post.excerpt}</p>

        <div className='flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6'>
          <div className='flex items-center gap-2'>
            <Calendar className='h-4 w-4' />
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          <div className='flex items-center gap-2'>
            <Clock className='h-4 w-4' />
            <span>{post.readTime} min read</span>
          </div>
          <div>
            <span className='font-medium'>{post.author.name}</span>
            {post.author.role && (
              <span className='text-muted-foreground'> · {post.author.role}</span>
            )}
          </div>
        </div>

        <div className='flex flex-wrap gap-2'>
          {post.tags.map((tag) => (
            <Badge key={tag} variant='secondary'>
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      <Separator className='mb-8' />

      {/* Content */}
      <div className='prose prose-lg max-w-none dark:prose-invert'>
        {content}
      </div>

      <Separator className='my-12' />

      {/* CTA Section */}
      <Card className='bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20'>
        <CardContent className='p-8'>
          <div className='text-center space-y-4'>
            <div className='flex justify-center'>
              <div className='rounded-full bg-primary/10 p-3'>
                <CheckCircle2 className='h-8 w-8 text-primary' />
              </div>
            </div>
            <h2 className='text-2xl md:text-3xl font-bold'>
              Ready to guarantee your webhook delivery?
            </h2>
            <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
              Try Sigryn for free and see how we can help you avoid silent failures, implement automatic retries, and have complete visibility of your webhooks.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center pt-4'>
              <Link 
                to='/sign-up'
                onClick={() => blogEvents.postCtaClick(slug, 'signup')}
              >
                <Button size='lg' className='w-full sm:w-auto'>
                  Create free account
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
              </Link>
              <Link 
                to='/sign-in'
                onClick={() => blogEvents.postCtaClick(slug, 'signin')}
              >
                <Button variant='outline' size='lg' className='w-full sm:w-auto'>
                  I already have an account
                </Button>
              </Link>
            </div>
            <p className='text-sm text-muted-foreground pt-2'>
              No credit card required • Start in minutes • Full support
            </p>
          </div>
        </CardContent>
      </Card>

      <Separator className='my-12' />

      {/* Navigation */}
      <nav className='flex justify-between items-center gap-4'>
        {prevPost ? (
          <Link 
            to={`/blog/${prevPost.slug}` as any}
            onClick={() => blogEvents.postNavigationClick('previous', prevPost.slug)}
          >
            <div className='text-left'>
              <div className='text-sm text-muted-foreground mb-1'>Previous article</div>
              <div className='font-medium hover:text-primary transition-colors'>
                {prevPost.title}
              </div>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextPost ? (
          <Link 
            to={`/blog/${nextPost.slug}` as any}
            onClick={() => blogEvents.postNavigationClick('next', nextPost.slug)}
          >
            <div className='text-right'>
              <div className='text-sm text-muted-foreground mb-1'>Next article</div>
              <div className='font-medium hover:text-primary transition-colors'>
                {nextPost.title}
              </div>
            </div>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </article>
  )
}

