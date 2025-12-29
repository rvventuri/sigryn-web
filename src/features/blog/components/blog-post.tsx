import React from 'react'
import { Link } from '@tanstack/react-router'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getPostBySlug, getAllPosts, type BlogPost } from '../data/posts'

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
      const listItems: string[] = [line.slice(2)]
      let j = i + 1
      while (j < lines.length && (lines[j].startsWith('- ') || lines[j].startsWith('* '))) {
        listItems.push(lines[j].slice(2))
        j++
      }
      i = j - 1
      elements.push(
        <ul key={`ul-${elements.length}`} className='list-disc list-inside mb-4 space-y-2 ml-4'>
          {listItems.map((item, idx) => (
            <li key={idx} className='leading-7'>
              {item}
            </li>
          ))}
        </ul>
      )
      continue
    }

    // Bold
    if (line.includes('**')) {
      const parts = line.split('**')
      for (let j = 0; j < parts.length; j++) {
        if (j % 2 === 1) {
          currentParagraph.push(<strong key={`bold-${j}`}>{parts[j]}</strong>)
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
        <h1 className='text-3xl font-bold mb-4'>Post não encontrado</h1>
        <p className='text-muted-foreground mb-8'>
          O artigo que você está procurando não existe.
        </p>
        <Link to={'/blog' as any}>
          <Button>Voltar ao blog</Button>
        </Link>
      </div>
    )
  }

  const content = formatMarkdown(post.content)

  return (
    <article className='container mx-auto px-4 py-16 max-w-4xl'>
      {/* Back button */}
      <Link to={'/blog' as any}>
        <Button variant='ghost' className='mb-8'>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Voltar ao blog
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
              {new Date(post.publishedAt).toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          <div className='flex items-center gap-2'>
            <Clock className='h-4 w-4' />
            <span>{post.readTime} min de leitura</span>
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

      {/* Navigation */}
      <nav className='flex justify-between items-center gap-4'>
        {prevPost ? (
          <Link to={`/blog/${prevPost.slug}` as any}>
            <div className='text-left'>
              <div className='text-sm text-muted-foreground mb-1'>Artigo anterior</div>
              <div className='font-medium hover:text-primary transition-colors'>
                {prevPost.title}
              </div>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextPost ? (
          <Link to={`/blog/${nextPost.slug}` as any}>
            <div className='text-right'>
              <div className='text-sm text-muted-foreground mb-1'>Próximo artigo</div>
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

