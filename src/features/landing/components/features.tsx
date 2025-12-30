import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  GitBranch,
  Shield,
  BarChart3,
  Code,
  Webhook,
  Database,
  Bell,
} from 'lucide-react'

const mainFeatures = [
  {
    icon: Database,
    title: 'Resilient event queueing',
    description:
      'Control and buffer event flow with a robust queue system that manages traffic spikes, automatic retries, and handles destination failures — zero infrastructure needed.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Bell,
    title: 'Failed event management and replay',
    description:
      'Automatically identify failed events, examine detailed metadata, and replay them with one click — no additional tools required.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Code,
    title: 'Local development with production traffic',
    description:
      'Route real webhook events to your localhost using the Sigryn CLI — collaborate with your entire team seamlessly.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: GitBranch,
    title: 'Intelligent routing and transformation',
    description:
      'Easily filter, transform, and route events to multiple destinations using payload content, headers, or custom metadata rules.',
    gradient: 'from-orange-500 to-red-500',
  },
]

const features = [
  {
    icon: Webhook,
    title: 'Advanced routing and filtering',
    description:
      'Route webhooks intelligently across multiple endpoints with smart retry mechanisms, circuit breakers, and comprehensive error handling.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Database,
    title: 'Event queueing and rate control',
    description:
      'Queue events efficiently with a fault-tolerant system that absorbs traffic surges and manages destination outages — infrastructure-free.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: BarChart3,
    title: 'Complete observability and logging',
    description:
      'Monitor every webhook with comprehensive metrics, response times, success rates, and detailed error tracking in real-time.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Shield,
    title: 'Production-ready safeguards',
    description:
      'Enterprise-grade retry strategies, circuit breakers, and failure management guarantee zero event loss and dependable processing.',
    gradient: 'from-orange-500 to-red-500',
  },
]

export function Features() {
  return (
    <section className='py-24 sm:py-32'>
      <div className='container px-4'>
        {/* Main Features - Highlighted */}
        <div className='grid gap-8 md:grid-cols-2 mb-24'>
          {mainFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className='group relative overflow-hidden border-2 transition-all hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1'
              >
                <CardHeader>
                  <div
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${feature.gradient} text-white shadow-lg`}
                  >
                    <Icon className='h-6 w-6' />
                  </div>
                  <CardTitle className='text-xl'>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className='text-base leading-relaxed'>
                    {feature.description}
                  </CardDescription>
                </CardContent>
                {/* Hover effect gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity group-hover:opacity-5`}
                />
              </Card>
            )
          })}
        </div>

        {/* Section Header */}
        <header className='mx-auto max-w-2xl text-center mb-16'>
          <h2 className='text-4xl font-bold tracking-tight sm:text-5xl'>
            Complete infrastructure for{' '}
            <span className='block bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent italic'>
              event-driven architectures
            </span>
          </h2>
          <p className='mt-6 text-lg text-muted-foreground'>
            Sigryn offers comprehensive event infrastructure that handles the entire lifecycle of external signals — from initial ingestion and signature validation through guaranteed delivery to full observability.
          </p>
        </header>

        {/* Features Grid */}
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className='group relative overflow-hidden border-2 transition-all hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1'
              >
                <CardHeader>
                  <div
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${feature.gradient} text-white shadow-lg`}
                  >
                    <Icon className='h-6 w-6' />
                  </div>
                  <CardTitle className='text-xl'>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className='text-base leading-relaxed'>
                    {feature.description}
                  </CardDescription>
                </CardContent>
                {/* Hover effect gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity group-hover:opacity-5`}
                />
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

