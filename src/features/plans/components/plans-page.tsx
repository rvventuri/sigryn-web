import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { plansApi, type Plan as ApiPlan } from '@/lib/plans-api'
import { subscriptionsApi } from '@/lib/subscriptions-api'
import { destinationsApi } from '@/lib/destinations-api'
import { toast } from 'sonner'
import { plans as localPlans, type Plan as LocalPlan } from '../data/plans'
import { LeadDialog } from './lead-dialog'

function PlanCard({ 
  plan, 
  isCurrentPlan,
  onSubscribe
}: { 
  plan: LocalPlan
  isCurrentPlan?: boolean
  onSubscribe: () => void
}) {
  const handleSubscribe = () => {
    if (plan.id === 'free') {
      toast.info('You are already on the free plan')
      return
    }
    onSubscribe()
  }

  const formatPrice = (price: number) => {
    if (price === 0) return 'Free'
    return `$${price.toFixed(2)}`
  }

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20'
      case 'purple':
        return 'border-purple-500 bg-purple-50/50 dark:bg-purple-950/20'
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
        <CardTitle className='text-2xl mb-2'>{plan.name}</CardTitle>
        <p className='text-sm text-muted-foreground mb-6'>
          {plan.description}
        </p>
        <div className='mt-6'>
          <span className='text-4xl font-bold'>{formatPrice(plan.price)}</span>
          {plan.price > 0 && (
            <span className='text-muted-foreground'> /month</span>
          )}
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
          disabled={isCurrentPlan}
        >
          {isCurrentPlan ? (
            'Current Plan'
          ) : (
            `Get Started with ${plan.name}`
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

export function PlansPage() {
  const [selectedPlan, setSelectedPlan] = useState<LocalPlan | null>(null)
  const [leadDialogOpen, setLeadDialogOpen] = useState(false)

  // Fetch plans from API
  const { data: apiPlans = [], isLoading: plansLoading } = useQuery({
    queryKey: ['plans'],
    queryFn: () => plansApi.getAll(),
  })

  // Get organizationId from destinations
  const { data: destinations = [] } = useQuery({
    queryKey: ['destinations'],
    queryFn: () => destinationsApi.getAll(),
  })

  const organizationId = destinations.length > 0 ? destinations[0].organizationId : ''

  // Fetch current subscription
  const { data: currentSubscription } = useQuery({
    queryKey: ['subscription', organizationId],
    queryFn: () => subscriptionsApi.getByOrganization(organizationId),
    enabled: !!organizationId,
  })

  const handlePlanSelect = (plan: LocalPlan) => {
    setSelectedPlan(plan)
    setLeadDialogOpen(true)
  }

  // Map API plans to local plans for display
  const getLocalPlan = (apiPlan: ApiPlan): LocalPlan | undefined => {
    return localPlans.find((p) => p.priceId === apiPlan.stripePriceId)
  }

  // Determine current plan
  const currentPlanType = currentSubscription?.plan?.planType || 'free'
  const isCurrentPlan = (planId: string) => {
    if (!currentSubscription?.plan) return planId === 'free'
    if (planId === 'free' && currentPlanType === 'free') return true
    if (planId === 'basic' && currentPlanType === 'production') return true
    if (planId === 'pro' && currentPlanType === 'advanced') return true
    return false
  }

  // Use API plans if available, fallback to local plans
  const displayPlans = apiPlans.length > 0 
    ? apiPlans.map((apiPlan) => {
        const localPlan = getLocalPlan(apiPlan)
        // If we have a matching local plan, use its features, otherwise create a basic one
        if (localPlan) {
          return {
            apiPlan,
            localPlan: {
              ...localPlan,
              price: apiPlan.amount, // Use price from API
              name: apiPlan.name, // Use name from API
              description: apiPlan.description, // Use description from API
            }
          }
        }
        // Fallback: create plan from API data
        const planId: 'free' | 'basic' | 'pro' = apiPlan.planType === 'free' ? 'free' : apiPlan.planType === 'production' ? 'basic' : 'pro'
        const fallbackLocalPlan = localPlans.find(p => p.id === planId) || localPlans[0]
        return {
          apiPlan,
          localPlan: {
            ...fallbackLocalPlan,
            id: planId as 'free' | 'basic' | 'pro',
            name: apiPlan.name,
            description: apiPlan.description,
            price: apiPlan.amount,
            priceId: apiPlan.stripePriceId,
            currency: apiPlan.currency,
            color: apiPlan.planType === 'production' ? 'blue' : apiPlan.planType === 'advanced' ? 'purple' : 'default',
            popular: apiPlan.planType === 'production',
          } as LocalPlan
        }
      })
    : localPlans.map((localPlan) => ({ localPlan, apiPlan: undefined }))

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
      {plansLoading ? (
        <div className='flex justify-center items-center py-12'>
          <Loader2 className='h-8 w-8 animate-spin' />
        </div>
      ) : (
        <div className='grid gap-8 md:grid-cols-3 lg:max-w-6xl lg:mx-auto'>
          {displayPlans.map(({ localPlan }) => (
            <PlanCard 
              key={localPlan.id} 
              plan={localPlan}
              isCurrentPlan={isCurrentPlan(localPlan.id)}
              onSubscribe={() => handlePlanSelect(localPlan)}
            />
          ))}
        </div>
      )}

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

