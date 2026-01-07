import { Eye, RotateCcw, Bell, History } from 'lucide-react'

const benefits = [
  {
    icon: Eye,
    title: 'Observability',
    description: 'Full delivery history. Request & response visibility.',
  },
  {
    icon: RotateCcw,
    title: 'Retry & Replay',
    description: 'Automatic retries. Manual replay with original payload.',
  },
  {
    icon: Bell,
    title: 'Alerts',
    description: 'Slack and email notifications. Failure thresholds.',
  },
  {
    icon: History,
    title: 'Audit History',
    description: 'Immutable logs. Debuggable timelines.',
  },
]

export function KeyBenefitsSection() {
  return (
    <section className='py-24 bg-[#0B0F1A]'>
      <div className='container px-4 max-w-6xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='mb-4 text-4xl sm:text-5xl font-bold text-white'>
            Key Benefits
          </h2>
        </div>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div
                key={index}
                className='p-6 rounded-lg bg-gray-800/20 border border-gray-700/30 hover:border-[#3ABFF8]/30 transition-all'
              >
                <div className='mb-4 inline-flex rounded-lg bg-[#3ABFF8]/10 p-3'>
                  <Icon className='h-6 w-6 text-[#3ABFF8]' />
                </div>
                <h3 className='text-xl font-semibold text-white mb-2'>
                  {benefit.title}
                </h3>
                <p className='text-gray-300 leading-relaxed'>
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

