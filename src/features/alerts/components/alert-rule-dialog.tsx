'use client'

import { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { alertRulesApi, type AlertRule } from '@/lib/notifications-api'
import { destinationsApi } from '@/lib/destinations-api'

const formSchema = z
  .object({
    scope: z.enum(['destination', 'organization']),
    destinationId: z.string().optional(),
    condition: z.enum([
      'failed_forward',
      'multiple_failures',
      'all_endpoints_failed',
      'high_failure_rate',
    ]),
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional().or(z.literal('')),
    failureThreshold: z.string().optional(),
    failureRateThreshold: z.string().optional(),
    timeWindowMinutes: z.string().optional(),
    cooldownMinutes: z.string().optional(),
    isActive: z.boolean().optional(),
  })

type AlertRuleForm = z.infer<typeof formSchema>

type AlertRuleDialogProps = {
  rule: AlertRule | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AlertRuleDialog({
  rule,
  open,
  onOpenChange,
}: AlertRuleDialogProps) {
  const isEdit = !!rule
  const queryClient = useQueryClient()

  const { data: destinations = [] } = useQuery({
    queryKey: ['destinations'],
    queryFn: () => destinationsApi.getAll(),
  })

  const form = useForm<AlertRuleForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      scope: 'organization',
      destinationId: undefined,
      condition: 'failed_forward',
      name: '',
      description: '',
      failureThreshold: undefined,
      failureRateThreshold: undefined,
      timeWindowMinutes: undefined,
      cooldownMinutes: '60' as string | undefined,
      isActive: true,
    },
  })

  const scope = form.watch('scope')
  const condition = form.watch('condition')

  useEffect(() => {
    if (rule) {
      form.reset({
        scope: rule.scope,
        destinationId: rule.destinationId || undefined,
        condition: rule.condition,
        name: rule.name,
        description: rule.description || '',
        failureThreshold: rule.failureThreshold?.toString() || undefined,
        failureRateThreshold: rule.failureRateThreshold?.toString() || undefined,
        timeWindowMinutes: rule.timeWindowMinutes?.toString() || undefined,
        cooldownMinutes: rule.cooldownMinutes?.toString() || '60',
        isActive: rule.isActive,
      })
    } else {
      form.reset({
        scope: 'organization',
        destinationId: undefined,
        condition: 'failed_forward',
        name: '',
        description: '',
        failureThreshold: undefined,
        failureRateThreshold: undefined,
        timeWindowMinutes: undefined,
        cooldownMinutes: '60',
        isActive: true,
      })
    }
  }, [rule, form])

  useEffect(() => {
    if (scope === 'organization') {
      form.setValue('destinationId', undefined)
    }
  }, [scope, form])

  useEffect(() => {
    if (condition !== 'multiple_failures') {
      form.setValue('failureThreshold', undefined)
    }
    if (condition !== 'high_failure_rate') {
      form.setValue('failureRateThreshold', undefined)
      form.setValue('timeWindowMinutes', undefined)
    }
  }, [condition, form])

  const onSubmit = async (values: AlertRuleForm) => {
    try {
      // Validate required fields based on condition
      if (values.condition === 'multiple_failures' && !values.failureThreshold) {
        form.setError('failureThreshold', {
          message: 'Failure threshold is required for multiple failures condition',
        })
        return
      }
      if (values.condition === 'high_failure_rate') {
        if (!values.failureRateThreshold || !values.timeWindowMinutes) {
          form.setError('failureRateThreshold', {
            message: 'Failure rate threshold and time window are required',
          })
          return
        }
      }

      const data = {
        scope: values.scope,
        destinationId: values.scope === 'destination' ? values.destinationId : undefined,
        condition: values.condition,
        name: values.name,
        description: values.description || undefined,
        failureThreshold:
          values.condition === 'multiple_failures' && values.failureThreshold
            ? Number(values.failureThreshold)
            : undefined,
        failureRateThreshold:
          values.condition === 'high_failure_rate' && values.failureRateThreshold
            ? Number(values.failureRateThreshold)
            : undefined,
        timeWindowMinutes:
          values.condition === 'high_failure_rate' && values.timeWindowMinutes
            ? Number(values.timeWindowMinutes)
            : undefined,
        cooldownMinutes: values.cooldownMinutes ? Number(values.cooldownMinutes) : 60,
        isActive: values.isActive,
      }

      if (isEdit && rule) {
        await alertRulesApi.update(rule.id, data)
        toast.success('Alert rule updated successfully')
      } else {
        await alertRulesApi.create(data)
        toast.success('Alert rule created successfully')
      }

      await queryClient.invalidateQueries({ queryKey: ['alert-rules'] })
      form.reset()
      onOpenChange(false)
    } catch (error) {
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} alert rule`)
      console.error(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Alert Rule' : 'Create Alert Rule'}</DialogTitle>
          <DialogDescription>
            Define conditions that trigger alerts when webhooks fail.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='scope'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scope</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isEdit}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select scope' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='organization'>Organization</SelectItem>
                      <SelectItem value='destination'>Destination</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Organization scope applies to all destinations. Destination scope
                    applies to a specific destination.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {scope === 'destination' && (
              <FormField
                control={form.control}
                name='destinationId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isEdit}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select destination' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {destinations.map((dest) => (
                          <SelectItem key={dest.id} value={dest.id}>
                            {dest.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name='condition'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Condition</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isEdit}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select condition' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='failed_forward'>Failed Forward</SelectItem>
                      <SelectItem value='multiple_failures'>Multiple Failures</SelectItem>
                      <SelectItem value='all_endpoints_failed'>
                        All Endpoints Failed
                      </SelectItem>
                      <SelectItem value='high_failure_rate'>
                        High Failure Rate
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {condition === 'failed_forward' &&
                      'Alert when any forward fails'}
                    {condition === 'multiple_failures' &&
                      'Alert when multiple forwards fail for the same webhook'}
                    {condition === 'all_endpoints_failed' &&
                      'Alert when all endpoints fail for a webhook'}
                    {condition === 'high_failure_rate' &&
                      'Alert when failure rate exceeds threshold in a time window'}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {condition === 'multiple_failures' && (
              <FormField
                control={form.control}
                name='failureThreshold'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Failure Threshold</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='3'
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormDescription>
                      Minimum number of failed forwards to trigger alert
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {condition === 'high_failure_rate' && (
              <>
                <FormField
                  control={form.control}
                  name='failureRateThreshold'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Failure Rate Threshold (%)</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='50'
                          min={0}
                          max={100}
                          value={field.value ?? ''}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormDescription>
                        Minimum failure rate percentage to trigger alert (0-100)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='timeWindowMinutes'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time Window (minutes)</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='60'
                          value={field.value ?? ''}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormDescription>
                        Time window in minutes to calculate failure rate
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Alert on Failed Forward' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Alert when any forward fails'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='cooldownMinutes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cooldown (minutes)</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='60'
                      value={field.value ?? ''}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormDescription>
                    Minutes to wait before sending another alert for the same condition
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='isActive'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                  <div className='space-y-0.5'>
                    <FormLabel className='text-base'>Active</FormLabel>
                    <FormDescription>
                      Enable or disable this alert rule
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type='submit'>{isEdit ? 'Update' : 'Create'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

