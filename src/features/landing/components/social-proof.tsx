import { Card, CardContent } from '@/components/ui/card'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO at TechStartup',
    company: 'TechStartup Inc.',
    image: '/api/placeholder/64/64',
    content:
      "Sigryn transformed how we handle integrations. We went from spending weeks building webhook infrastructure to deploying in hours. The reliability and signature validation are unmatched.",
    rating: 5,
  },
  {
    name: 'Michael Rodriguez',
    role: 'Lead Developer',
    company: 'Enterprise Solutions',
    image: '/api/placeholder/64/64',
    content:
      'The analytics and monitoring features are incredible. We can now see exactly what\'s happening with every webhook in real-time. This level of visibility was impossible before.',
    rating: 5,
  },
  {
    name: 'Emily Johnson',
    role: 'Product Manager',
    company: 'SaaS Platform',
    image: '/api/placeholder/64/64',
    content:
      "We process millions of events monthly. Sigryn handles it all effortlessly while maintaining sub-50ms latency and ensuring every signal is properly validated and delivered. Our customers love the reliability.",
    rating: 5,
  },
  {
    name: 'David Kim',
    role: 'DevOps Engineer',
    company: 'FinTech Corp',
    image: '/api/placeholder/64/64',
    content:
      'Security was our top concern, and Sigryn exceeded our expectations. The signature verification, encryption, and compliance features gave us complete confidence in handling critical events.',
    rating: 5,
  },
  {
    name: 'Lisa Anderson',
    role: 'Engineering Manager',
    company: 'E-commerce Giant',
    image: '/api/placeholder/64/64',
    content:
      'The developer experience is outstanding. Great documentation, intuitive API, and responsive support. We\'ve recommended it to all our partners.',
    rating: 5,
  },
  {
    name: 'James Wilson',
    role: 'Founder',
    company: 'StartupXYZ',
    image: '/api/placeholder/64/64',
    content:
      "As a startup, we couldn't afford to build event infrastructure. Sigryn's free tier got us started, and we've seamlessly scaled as we grew. The reliability and control have been game-changing.",
    rating: 5,
  },
]

const stats = [
  { value: '99.999%', label: 'Uptime' },
  { value: '< 3s', label: 'Worldwide P99' },
  { value: '5,000+', label: 'Events/second' },
  { value: 'SoC2', label: 'Compliant' },
]

export function SocialProof() {
  return (
    <section className='py-24 sm:py-32'>
      <div className='container px-4'>
        {/* Stats Section */}
        <div className='mb-16'>
          <div className='grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-9'>
            {stats.map((stat, index) => (
              <div key={index} className='text-center'>
                <div className='text-2xl font-bold text-primary sm:text-3xl'>
                  {stat.value}
                </div>
                <div className='mt-1 text-xs text-muted-foreground'>
                  {stat.label}
                </div>
              </div>
            ))}
            <div className='text-center'>
              <div className='text-2xl font-bold text-primary sm:text-3xl'>
                GDPR & CCPA
              </div>
              <div className='mt-1 text-xs text-muted-foreground'>
                Compliant
              </div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-primary sm:text-3xl'>
                Data
              </div>
              <div className='mt-1 text-xs text-muted-foreground'>
                Encryption
              </div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-primary sm:text-3xl'>
                Single
              </div>
              <div className='mt-1 text-xs text-muted-foreground'>
                Sign-On
              </div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-primary sm:text-3xl'>
                Flexible
              </div>
              <div className='mt-1 text-xs text-muted-foreground'>
                Authentication
              </div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-primary sm:text-3xl'>
                Role-Based
              </div>
              <div className='mt-1 text-xs text-muted-foreground'>
                Access
              </div>
            </div>
          </div>
          <div className='mt-8 text-center'>
            <p className='text-lg font-semibold text-muted-foreground'>
              Scalable, secure, and compliant
            </p>
          </div>
        </div>

        {/* Testimonials Header */}
        <header className='mx-auto max-w-2xl text-center mb-12'>
          <h2 className='text-4xl font-bold tracking-tight sm:text-5xl'>
            Trusted by engineering teams{' '}
            <span className='bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent italic'>
              worldwide
            </span>
          </h2>
        </header>

        {/* Testimonials Grid */}
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className='border-2 transition-all hover:shadow-lg hover:-translate-y-1'
            >
              <CardContent className='p-6'>
                {/* Rating */}
                <div className='mb-4 flex gap-1'>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className='h-4 w-4 fill-yellow-400 text-yellow-400'
                    />
                  ))}
                </div>

                {/* Content */}
                <p className='mb-6 text-muted-foreground leading-relaxed'>
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className='flex items-center gap-3'>
                  <Avatar>
                    <AvatarImage
                      src={testimonial.image}
                      alt={`${testimonial.name} avatar`}
                      loading='lazy'
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className='font-semibold'>{testimonial.name}</div>
                    <div className='text-sm text-muted-foreground'>
                      {testimonial.role}
                    </div>
                    <div className='text-xs text-muted-foreground'>
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

