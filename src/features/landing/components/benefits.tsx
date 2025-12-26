import { Card, CardContent } from '@/components/ui/card'
import {
  CheckCircle2,
  TrendingUp,
  Code,
  BarChart3,
  GitBranch,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const benefits = [
  {
    icon: Code,
    title: 'Works with your existing stack',
    description:
      'Integrate Sigryn into any technology stack, framework, or runtime without requiring specific setup patterns or SDKs.',
    details: [
      'Works seamlessly with REST, GraphQL, and event-driven architectures',
      'Perfect for serverless functions, containerized apps, and traditional monoliths',
      'Zero vendor lock-in — no proxying or routing changes needed',
    ],
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: GitBranch,
    title: 'Infrastructure as code',
    description:
      'Manage Sigryn configurations programmatically via our API or Terraform provider for streamlined automation.',
    details: [
      'Deploy and manage configurations using infrastructure as code practices',
      'Version control and share configurations across development environments',
      'Seamless CI/CD integration for automated testing and deployment workflows',
    ],
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: TrendingUp,
    title: 'Built for massive scale',
    description:
      'Maintain consistent performance during traffic surges with intelligent resilience controls that gracefully handle load spikes.',
    details: [
      'Absorb sudden traffic increases without service degradation',
      'Automatic throughput management and backpressure controls',
      'Overflow protection guarantees event preservation under extreme load',
    ],
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: BarChart3,
    title: 'Real-time monitoring and debugging',
    description:
      'Achieve comprehensive visibility across all event flows with live tracing, instant replay capabilities, and exhaustive delivery analytics.',
    details: [
      'Complete event history with full request/response logging',
      'Intelligent error detection and proactive alerting systems',
      'Detailed analytics export for advanced reporting and analysis',
    ],
    gradient: 'from-orange-500 to-red-500',
  },
]

const useCases = [
  {
    title: 'Incoming webhook management',
    description:
      'Capture, queue, filter, transform, and route webhooks from external services with enterprise-grade reliability and full visibility.',
    icon: '📥',
  },
  {
    title: 'Local development workflow',
    description:
      'Forward production webhooks directly to your localhost using the Sigryn CLI — perfect for team collaboration.',
    icon: '🔧',
  },
  {
    title: 'Outbound webhook delivery',
    description:
      'Send events and webhooks to customers and partner systems reliably, handling millions of deliveries at scale.',
    icon: '📤',
  },
  {
    title: 'Multi-destination routing',
    description:
      'Distribute events from external sources to multiple endpoints with powerful filtering, transformation, and monitoring capabilities.',
    icon: '🔄',
  },
]

export function Benefits() {
  return (
    <section className='py-24 sm:py-32 bg-muted/30'>
      <div className='container px-4'>
        {/* Benefits Section */}
        <div className='mx-auto max-w-2xl text-center mb-16'>
          <h2 className='text-4xl font-bold tracking-tight sm:text-5xl'>
            Works the way{' '}
            <span className='bg-gradient-to-r from-primary to-green-500 bg-clip-text text-transparent italic'>
              you build
            </span>
          </h2>
        </div>

        <div className='grid gap-8 md:grid-cols-2 mb-24'>
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <Card
                key={index}
                className='group relative overflow-hidden border-2 transition-all hover:shadow-xl hover:-translate-y-1'
              >
                <CardContent className='p-8'>
                  <div className='flex items-start gap-4'>
                    <div
                      className={cn(
                        'flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br',
                        `bg-gradient-to-br ${benefit.gradient}`,
                        'text-white shadow-lg'
                      )}
                    >
                      <Icon className='h-7 w-7' />
                    </div>
                    <div className='flex-1'>
                      <h3 className='text-xl font-bold mb-3'>{benefit.title}</h3>
                      <p className='text-muted-foreground leading-relaxed mb-4'>
                        {benefit.description}
                      </p>
                      <ul className='space-y-2'>
                        {benefit.details.map((detail, i) => (
                          <li key={i} className='text-sm text-muted-foreground flex items-start gap-2'>
                            <CheckCircle2 className='h-4 w-4 text-primary mt-0.5 shrink-0' />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <div
                  className={cn(
                    'absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-5',
                    `bg-gradient-to-br ${benefit.gradient}`
                  )}
                />
              </Card>
            )
          })}
        </div>

        {/* Use Cases Section */}
        <div className='mx-auto max-w-2xl text-center mb-12'>
          <h3 className='text-3xl font-bold tracking-tight sm:text-4xl'>
            Built for{' '}
            <span className='bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent italic'>
              modern event architectures
            </span>
          </h3>
          <p className='mt-4 text-lg text-muted-foreground'>
            From ingesting signals from third-party services to delivering outbound events with verified signatures, Sigryn provides your team with the infrastructure, reliability, and control essential for building mission-critical event-driven systems.
          </p>
        </div>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {useCases.map((useCase, index) => (
            <Card
              key={index}
              className='group border-2 transition-all hover:shadow-lg hover:-translate-y-1'
            >
              <CardContent className='p-6 text-center'>
                <div className='mb-4 text-4xl'>{useCase.icon}</div>
                <h4 className='mb-2 text-lg font-semibold'>
                  {useCase.title}
                </h4>
                <p className='text-sm text-muted-foreground'>
                  {useCase.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

