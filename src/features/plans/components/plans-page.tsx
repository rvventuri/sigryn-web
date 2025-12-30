import { useState } from 'react'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { LeadDialog } from './lead-dialog'

type Plan = {
  id: 'free' | 'basic' | 'pro'
  name: string
  emoji: string
  price: string
  features: string[]
  color: 'default' | 'blue' | 'purple'
  popular?: boolean
}

function PlanCard({ 
  plan, 
  onSubscribe
}: { 
  plan: Plan
  onSubscribe: () => void
}) {
  const handleSubscribe = () => {
    if (plan.id === 'free') {
      toast.info('You are already on the free plan')
      return
    }
    onSubscribe()
  }

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'border-blue-500 bg-blue-50/50'
      case 'purple':
        return 'border-purple-500 bg-purple-50/50'
      default:
        return 'border-border'
    }
  }

  return (
    <Card
      className={`relative border-2 transition-all ${
        plan.popular
          ? `${getColorClasses(plan.color)} shadow-xl scale-105`
          : 'hover:shadow-lg hover:-translate-y-1'
      }`}
    >
      {plan.popular && (
        <div className='absolute -top-4 left-1/2 -translate-x-1/2'>
          <Badge className='bg-primary text-primary-foreground px-4 py-1'>
            Most Popular
          </Badge>
        </div>
      )}

      <CardHeader className='text-center pb-8'>
        <div className='mb-4 text-4xl'>{plan.emoji}</div>
        <CardTitle className='text-2xl mb-2'>{plan.name}</CardTitle>
        <div className='mt-6'>
          <span className='text-4xl font-bold'>{plan.price}</span>
        </div>
      </CardHeader>

      <CardContent className='space-y-6'>
        <ul className='space-y-4'>
          {plan.features.map((feature, index) => (
            <li key={index} className='flex items-start gap-3'>
              <Check className='mt-0.5 h-5 w-5 shrink-0 text-green-500' />
              <span className='text-sm'>{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          className='w-full'
          variant={plan.popular ? 'default' : 'outline'}
          size='lg'
          onClick={handleSubscribe}
        >
          {plan.id === 'free' ? 'Current Plan' : 'Subscribe'}
        </Button>
      </CardContent>
    </Card>
  )
}

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Sigryn Free',
    emoji: '🆓',
    price: 'Free',
    color: 'default',
    features: [
      'Up to 2 destinations',
      '1,000 events / month',
      '7-day event history',
      'Manual retry',
      'Full payload & headers visibility',
      'Basic webhook monitoring',
    ],
  },
  {
    id: 'basic',
    name: 'Sigryn Basic',
    emoji: '🟦',
    price: 'Custom',
    color: 'blue',
    popular: true,
    features: [
      'Up to 5 destinations',
      '50,000 events / month',
      '30-day event history',
      'Manual retry & replay',
      'Full event timeline',
      'Production-ready dashboard',
    ],
  },
  {
    id: 'pro',
    name: 'Sigryn Pro',
    emoji: '🟪',
    price: 'Custom',
    color: 'purple',
    features: [
      'Unlimited destinations',
      '500,000 events / month',
      '90-day event history',
      'Automatic retries with backoff',
      'Manual & automated replay',
      'Alerts (Slack & Email)',
      'Webhook health metrics',
    ],
  },
]

export function PlansPage() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [leadDialogOpen, setLeadDialogOpen] = useState(false)

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan)
    setLeadDialogOpen(true)
  }

  return (
    <div className='container mx-auto px-4 py-8 max-w-6xl'>
      {/* Header */}
      <div className='text-center mb-12'>
        <h1 className='text-4xl md:text-5xl font-bold mb-4'>
          Choose Your Plan
        </h1>
        <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
          Select the perfect plan for your webhook infrastructure needs. All plans
          include our core reliability features.
        </p>
      </div>

      {/* Plans Grid */}
      <div className='grid gap-8 md:grid-cols-3 lg:max-w-6xl lg:mx-auto'>
        {plans.map((plan) => (
          <PlanCard 
            key={plan.id} 
            plan={plan}
            onSubscribe={() => handlePlanSelect(plan)}
          />
        ))}
      </div>

      {/* Lead Dialog */}
      {selectedPlan && (
        <LeadDialog
          open={leadDialogOpen}
          onOpenChange={setLeadDialogOpen}
          planName={selectedPlan.name}
          onSuccess={() => {
            setSelectedPlan(null)
          }}
        />
      )}

      {/* FAQ Section */}
      <div className='mt-24 mx-auto max-w-3xl'>
        <h2 className='text-center text-2xl font-bold mb-8'>
          Frequently Asked Questions
        </h2>
        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>
                Can I change plans anytime?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                Yes! You can upgrade, downgrade, or cancel your plan at any time.
                Changes take effect immediately, and we&apos;ll prorate any charges.
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
                We&apos;ll notify you before you hit your limits. You can upgrade
                your plan or purchase additional capacity. We never cut off your
                service unexpectedly.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>
                Do you offer refunds?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                Yes, we offer a 30-day money-back guarantee on all paid plans. If
                you&apos;re not satisfied, contact us for a full refund.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

