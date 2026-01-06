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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import {
  notificationsConfigsApi,
  type NotificationConfig,
} from '@/lib/notifications-api'
import { destinationsApi } from '@/lib/destinations-api'

const formSchema = z.object({
  scope: z.enum(['destination', 'organization']),
  destinationId: z.string().optional(),
  channel: z.enum(['slack', 'email']),
  webhookUrl: z.string().min(1, 'Webhook URL or email is required'),
  name: z.string().optional(),
  isActive: z.boolean().optional(),
})

type NotificationConfigForm = z.infer<typeof formSchema>

type NotificationConfigDialogProps = {
  config: NotificationConfig | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NotificationConfigDialog({
  config,
  open,
  onOpenChange,
}: NotificationConfigDialogProps) {
  const isEdit = !!config
  const queryClient = useQueryClient()

  const { data: destinations = [] } = useQuery({
    queryKey: ['destinations'],
    queryFn: () => destinationsApi.getAll(),
  })

  const form = useForm<NotificationConfigForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      scope: 'organization',
      destinationId: undefined,
      channel: 'slack',
      webhookUrl: '',
      name: '',
      isActive: true,
    },
  })

  const scope = form.watch('scope')
  const channel = form.watch('channel')

  useEffect(() => {
    if (config) {
      form.reset({
        scope: config.scope,
        destinationId: config.destinationId || undefined,
        channel: config.channel,
        webhookUrl: config.webhookUrl,
        name: config.name || '',
        isActive: config.isActive,
      })
    } else {
      form.reset({
        scope: 'organization',
        destinationId: undefined,
        channel: 'slack',
        webhookUrl: '',
        name: '',
        isActive: true,
      })
    }
  }, [config, form])

  useEffect(() => {
    if (scope === 'organization') {
      form.setValue('destinationId', undefined)
    }
  }, [scope, form])

  const onSubmit = async (values: NotificationConfigForm) => {
    try {
      // Validate webhookUrl based on channel
      if (values.channel === 'email') {
        const emailSchema = z.string().email()
        const result = emailSchema.safeParse(values.webhookUrl)
        if (!result.success) {
          form.setError('webhookUrl', {
            message: 'Invalid email address',
          })
          return
        }
      } else {
        try {
          new URL(values.webhookUrl)
        } catch {
          form.setError('webhookUrl', {
            message: 'Invalid URL',
          })
          return
        }
      }

      const data = {
        scope: values.scope,
        destinationId: values.scope === 'destination' ? values.destinationId : undefined,
        channel: values.channel,
        webhookUrl: values.webhookUrl,
        name: values.name || undefined,
        isActive: values.isActive,
      }

      if (isEdit && config) {
        await notificationsConfigsApi.update(config.id, {
          name: data.name,
          webhookUrl: data.webhookUrl,
          isActive: data.isActive,
        })
        toast.success('Notification config updated successfully')
      } else {
        await notificationsConfigsApi.create(data)
        toast.success('Notification config created successfully')
      }

      await queryClient.invalidateQueries({ queryKey: ['notification-configs'] })
      form.reset()
      onOpenChange(false)
    } catch (error) {
      toast.error(
        `Failed to ${isEdit ? 'update' : 'create'} notification config`
      )
      console.error(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Edit Notification Config' : 'Create Notification Config'}
          </DialogTitle>
          <DialogDescription>
            Configure a Slack webhook or email address to receive alerts.
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
              name='channel'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isEdit}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select channel' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='slack'>Slack</SelectItem>
                      <SelectItem value='email'>Email</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='webhookUrl'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {channel === 'slack' ? 'Slack Webhook URL' : 'Email Address'}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        channel === 'slack'
                          ? 'https://hooks.slack.com/services/...'
                          : 'admin@example.com'
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {channel === 'slack'
                      ? 'Enter your Slack webhook URL'
                      : 'Enter the email address to receive alerts'}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder='My Slack Channel' {...field} />
                  </FormControl>
                  <FormDescription>
                    A descriptive name for this notification config
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
                      Enable or disable this notification config
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

