import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Sparkles, Rocket, Crown } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for small projects and testing',
    icon: Sparkles,
    price: 'Free',
    period: 'forever',
    badge: null,
    features: [
      '1,000 webhooks/month',
      '2 destinations',
      'Basic analytics',
      '7-day history',
      'Community support',
      'Standard SLA',
    ],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Professional',
    description: 'For growing businesses and teams',
    icon: Rocket,
    price: '$29',
    period: 'per month',
    badge: 'Most Popular',
    features: [
      '100,000 webhooks/month',
      'Unlimited destinations',
      'Advanced analytics & monitoring',
      '90-day history',
      'Priority support',
      '99.9% SLA',
      'Custom transformations',
      'Webhook replay',
      'Advanced alerting',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'For large-scale operations',
    icon: Crown,
    price: 'Custom',
    period: 'pricing',
    badge: null,
    features: [
      'Unlimited webhooks',
      'Unlimited destinations',
      'Enterprise analytics & dashboards',
      'Unlimited history',
      '24/7 dedicated support',
      '99.99% SLA',
      'Custom integrations',
      'SSO & advanced security',
      'Dedicated infrastructure',
      'Custom SLA terms',
      'Account manager',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

export function Pricing() {
  return (
    <section className='py-24 sm:py-32 bg-muted/30'>
      <div className='container px-4'>
        {/* Header */}
        <div className='mx-auto max-w-2xl text-center mb-16'>
          <h2 className='text-4xl font-bold tracking-tight sm:text-5xl'>
            Simple, Transparent
            <span className='block bg-gradient-to-r from-primary to-green-500 bg-clip-text text-transparent'>
              Pricing That Grows With You
            </span>
          </h2>
          <p className='mt-6 text-lg text-muted-foreground'>
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className='grid gap-8 md:grid-cols-3 lg:max-w-6xl lg:mx-auto'>
          {plans.map((plan, index) => {
            const Icon = plan.icon
            return (
              <Card
                key={index}
                className={`relative border-2 transition-all ${
                  plan.popular
                    ? 'border-primary shadow-xl scale-105'
                    : 'hover:shadow-lg hover:-translate-y-1'
                }`}
              >
                {plan.badge && (
                  <div className='absolute -top-4 left-1/2 -translate-x-1/2'>
                    <Badge className='bg-primary text-primary-foreground px-4 py-1'>
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <CardHeader className='text-center pb-8'>
                  <div className='mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10'>
                    <Icon className='h-6 w-6 text-primary' />
                  </div>
                  <CardTitle className='text-2xl'>{plan.name}</CardTitle>
                  <p className='mt-2 text-sm text-muted-foreground'>
                    {plan.description}
                  </p>
                  <div className='mt-6'>
                    <span className='text-4xl font-bold'>{plan.price}</span>
                    {plan.period !== 'forever' && (
                      <span className='text-muted-foreground'>
                        /{plan.period}
                      </span>
                    )}
                  </div>
                </CardHeader>

                <CardContent className='space-y-6'>
                  <ul className='space-y-4'>
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className='flex items-start gap-3'>
                        <Check className='mt-0.5 h-5 w-5 shrink-0 text-green-500' />
                        <span className='text-sm'>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to='/sign-up'
                    className='block'
                  >
                    <Button
                      className='w-full'
                      variant={plan.popular ? 'default' : 'outline'}
                      size='lg'
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* FAQ Section */}
        <div className='mt-24 mx-auto max-w-3xl'>
          <h3 className='text-center text-2xl font-bold mb-8'>
            Frequently Asked Questions
          </h3>
          <div className='space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>
                  Can I change plans anytime?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  Yes! You can upgrade, downgrade, or cancel your plan at any
                  time. Changes take effect immediately, and we'll prorate any
                  charges.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>
                  What happens if I exceed my plan limits?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  We'll notify you before you hit your limits. You can upgrade
                  your plan or purchase additional capacity. We never cut off
                  your service unexpectedly.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>
                  Do you offer discounts for annual plans?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  Yes! Annual plans come with a 20% discount. Contact our sales
                  team for enterprise pricing and custom agreements.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

