'use client'

import { useState, useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useQueryClient, useQuery } from '@tanstack/react-query'
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
import { Switch } from '@/components/ui/switch'
import { SelectDropdown } from '@/components/select-dropdown'
import { PasswordInput } from '@/components/password-input'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { destinationsApi } from '@/lib/destinations-api'
import { endpointsApi, type HttpMethod, type AuthType } from '@/lib/endpoints-api'
import { type Destination } from '../data/schema'

const httpMethods: { label: string; value: HttpMethod }[] = [
  { label: 'GET', value: 'GET' },
  { label: 'POST', value: 'POST' },
  { label: 'PUT', value: 'PUT' },
  { label: 'PATCH', value: 'PATCH' },
  { label: 'DELETE', value: 'DELETE' },
]

const authTypes: { label: string; value: AuthType }[] = [
  { label: 'None', value: 'none' },
  { label: 'Bearer Token', value: 'bearer' },
  { label: 'Basic Auth', value: 'basic' },
  { label: 'API Key', value: 'api_key' },
  { label: 'Custom', value: 'custom' },
]

const formSchema = z
  .object({
    // Destination fields
    name: z.string().min(1, 'Name is required.').max(255, 'Name must be at most 255 characters.'),
    provider: z.string().max(100, 'Provider must be at most 100 characters.').optional().or(z.literal('')),
    description: z.string().optional().or(z.literal('')),
    isActive: z.boolean().optional(),
    // Endpoint fields
    targetUrl: z.string().url('Must be a valid URL').max(500, 'URL must be at most 500 characters'),
    endpointName: z.string().max(255, 'Name must be at most 255 characters').optional().or(z.literal('')),
    method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']).optional(),
    authType: z.enum(['none', 'bearer', 'basic', 'api_key', 'custom']).optional(),
    authHeaderName: z.string().max(100, 'Header name must be at most 100 characters').optional().or(z.literal('')),
    authHeaderValue: z.string().optional().or(z.literal('')),
    maxRetries: z.coerce.number().min(0).max(10).optional(),
    retryDelaySeconds: z.coerce.number().min(1).max(3600).optional(),
    timeoutSeconds: z.coerce.number().min(1).max(300).optional(),
    customHeaders: z.string().optional(),
    endpointIsActive: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (data.authType && data.authType !== 'none') {
        if (!data.authHeaderName || data.authHeaderName.trim() === '') {
          return false
        }
      }
      return true
    },
    {
      message: 'Auth header name is required when auth type is set',
      path: ['authHeaderName'],
    }
  )

type DestinationEndpointForm = z.infer<typeof formSchema>

type DestinationEndpointActionDialogProps = {
  currentRow?: Destination
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DestinationEndpointActionDialog({
  currentRow,
  open,
  onOpenChange,
}: DestinationEndpointActionDialogProps) {
  const isEdit = !!currentRow
  const queryClient = useQueryClient()
  const [customHeadersError, setCustomHeadersError] = useState<string>('')
  const [activeTab, setActiveTab] = useState('destination')

  // Fetch endpoint when editing
  const { data: endpoint } = useQuery({
    queryKey: ['endpoints', currentRow?.id],
    queryFn: async () => {
      if (!currentRow) return null
      const endpoints = await endpointsApi.getAll(currentRow.id)
      return endpoints[0] || null // Get first endpoint (1:1 relationship)
    },
    enabled: isEdit && !!currentRow,
  })

  const form = useForm<DestinationEndpointForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      provider: '',
      description: '',
      isActive: true,
      targetUrl: '',
      endpointName: '',
      method: 'POST',
      authType: 'none',
      authHeaderName: '',
      authHeaderValue: '',
      maxRetries: 3,
      retryDelaySeconds: 60,
      timeoutSeconds: 30,
      customHeaders: '',
      endpointIsActive: true,
    },
  })

  // Update form when editing
  useEffect(() => {
    if (isEdit && currentRow) {
      form.reset({
        name: currentRow.name,
        provider: currentRow.provider || '',
        description: currentRow.description || '',
        isActive: currentRow.isActive,
        targetUrl: endpoint?.targetUrl || '',
        endpointName: endpoint?.name || '',
        method: endpoint?.method || 'POST',
        authType: (endpoint?.authType as AuthType) || 'none',
        authHeaderName: endpoint?.authHeaderName || '',
        authHeaderValue: '', // Never populate for security
        maxRetries: endpoint?.maxRetries || 3,
        retryDelaySeconds: endpoint?.retryDelaySeconds || 60,
        timeoutSeconds: endpoint?.timeoutSeconds || 30,
        customHeaders: endpoint?.customHeaders
          ? JSON.stringify(endpoint.customHeaders, null, 2)
          : '',
        endpointIsActive: endpoint?.isActive ?? true,
      })
    } else {
      form.reset({
        name: '',
        provider: '',
        description: '',
        isActive: true,
        targetUrl: '',
        endpointName: '',
        method: 'POST',
        authType: 'none',
        authHeaderName: '',
        authHeaderValue: '',
        maxRetries: 3,
        retryDelaySeconds: 60,
        timeoutSeconds: 30,
        customHeaders: '',
        endpointIsActive: true,
      })
    }
  }, [isEdit, currentRow, endpoint, form])

  const authType = form.watch('authType')
  const showAuthFields = authType && authType !== 'none'

  const onSubmit = async (values: DestinationEndpointForm) => {
    try {
      // Parse customHeaders
      let customHeadersObj: Record<string, string> | undefined = undefined
      if (values.customHeaders && values.customHeaders.trim() !== '') {
        try {
          customHeadersObj = JSON.parse(values.customHeaders)
          if (typeof customHeadersObj !== 'object' || Array.isArray(customHeadersObj)) {
            throw new Error('Custom headers must be an object')
          }
        } catch (error) {
          setCustomHeadersError('Invalid JSON format')
          return
        }
      }
      setCustomHeadersError('')

      if (isEdit && currentRow) {
        // Update destination
        await destinationsApi.update(currentRow.id, {
          name: values.name,
          provider: values.provider || undefined,
          description: values.description || undefined,
          isActive: values.isActive,
        })

        // Update endpoint if it exists
        if (endpoint) {
          const endpointPayload = {
            targetUrl: values.targetUrl,
            name: values.endpointName || undefined,
            method: values.method || 'POST',
            authType: values.authType || undefined,
            authHeaderName: showAuthFields ? values.authHeaderName || undefined : undefined,
            authHeaderValue: showAuthFields && values.authHeaderValue
              ? values.authHeaderValue
              : undefined,
            maxRetries: values.maxRetries,
            retryDelaySeconds: values.retryDelaySeconds,
            timeoutSeconds: values.timeoutSeconds,
            customHeaders: customHeadersObj,
            isActive: values.endpointIsActive ?? true,
          }
          await endpointsApi.update(currentRow.id, endpoint.id, endpointPayload)
        } else {
          // Create endpoint if it doesn't exist
          const endpointPayload = {
            targetUrl: values.targetUrl,
            name: values.endpointName || undefined,
            method: values.method || 'POST',
            authType: values.authType || undefined,
            authHeaderName: showAuthFields ? values.authHeaderName || undefined : undefined,
            authHeaderValue: showAuthFields && values.authHeaderValue
              ? values.authHeaderValue
              : undefined,
            maxRetries: values.maxRetries,
            retryDelaySeconds: values.retryDelaySeconds,
            timeoutSeconds: values.timeoutSeconds,
            customHeaders: customHeadersObj,
            isActive: values.endpointIsActive ?? true,
          }
          await endpointsApi.create(currentRow.id, endpointPayload)
        }

        toast.success('Destination and endpoint updated successfully')
      } else {
        // Create destination first
        const destination = await destinationsApi.create({
          name: values.name,
          provider: values.provider || undefined,
          description: values.description || undefined,
        })

        // Then create endpoint
        const endpointPayload = {
          targetUrl: values.targetUrl,
          name: values.endpointName || undefined,
          method: values.method || 'POST',
          authType: values.authType || undefined,
          authHeaderName: showAuthFields ? values.authHeaderName || undefined : undefined,
          authHeaderValue: showAuthFields && values.authHeaderValue
            ? values.authHeaderValue
            : undefined,
          maxRetries: values.maxRetries,
          retryDelaySeconds: values.retryDelaySeconds,
          timeoutSeconds: values.timeoutSeconds,
          customHeaders: customHeadersObj,
          isActive: values.endpointIsActive ?? true,
        }
        await endpointsApi.create(destination.id, endpointPayload)

        toast.success('Destination and endpoint created successfully')
      }

      // Invalidate and refetch
      await queryClient.invalidateQueries({ queryKey: ['destinations'] })
      if (currentRow) {
        await queryClient.invalidateQueries({ queryKey: ['endpoints', currentRow.id] })
      }

      form.reset()
      onOpenChange(false)
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || 'Failed to save destination and endpoint'
      toast.error(
        Array.isArray(errorMessage) ? errorMessage[0] : errorMessage
      )
      console.error(error)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        setCustomHeadersError('')
        setActiveTab('destination')
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-3xl max-h-[90vh] overflow-hidden flex flex-col'>
        <DialogHeader className='text-start'>
          <DialogTitle>
            {isEdit ? 'Edit Destination & Endpoint' : 'Create New Destination & Endpoint'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update the destination and endpoint configuration here. '
              : 'Create a new destination with its endpoint. '}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className='flex-1 overflow-y-auto py-1 pe-3'>
          <Form {...form}>
            <form
              id='destination-endpoint-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-6 px-0.5'
            >
              <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
                <TabsList className='grid w-full grid-cols-2'>
                  <TabsTrigger value='destination'>Destination</TabsTrigger>
                  <TabsTrigger value='endpoint'>Endpoint</TabsTrigger>
                </TabsList>

                <TabsContent value='destination' className='space-y-4 mt-4'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                        <FormLabel className='col-span-2 text-end'>
                          Name <span className='text-destructive'>*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Stripe Webhooks'
                            className='col-span-4'
                            autoComplete='off'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className='col-span-4 col-start-3' />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='provider'
                    render={({ field }) => (
                      <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                        <FormLabel className='col-span-2 text-end'>
                          Provider
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='stripe, paypal, etc.'
                            className='col-span-4'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className='col-span-4 col-start-3' />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                      <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                        <FormLabel className='col-span-2 text-end'>
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Webhook destination description'
                            className='col-span-4'
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className='col-span-4 col-start-3' />
                      </FormItem>
                    )}
                  />
                  {isEdit && (
                    <FormField
                      control={form.control}
                      name='isActive'
                      render={({ field }) => (
                        <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                          <FormLabel className='col-span-2 text-end'>
                            Active
                          </FormLabel>
                          <FormControl>
                            <div className='col-span-4 flex items-center space-x-2'>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                              <span className='text-sm text-muted-foreground'>
                                {field.value ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage className='col-span-4 col-start-3' />
                        </FormItem>
                      )}
                    />
                  )}
                </TabsContent>

                <TabsContent value='endpoint' className='space-y-4 mt-4'>
                  <div className='space-y-4'>
                    <h3 className='text-sm font-semibold'>Basic Information</h3>
                    <FormField
                      control={form.control}
                      name='targetUrl'
                      render={({ field }) => (
                        <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                          <FormLabel className='col-span-2 text-end'>
                            Target URL <span className='text-destructive'>*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder='https://example.com/webhook'
                              className='col-span-4'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className='col-span-4 col-start-3' />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='endpointName'
                      render={({ field }) => (
                        <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                          <FormLabel className='col-span-2 text-end'>
                            Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder='My Endpoint'
                              className='col-span-4'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className='col-span-4 col-start-3' />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='method'
                      render={({ field }) => (
                        <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                          <FormLabel className='col-span-2 text-end'>
                            HTTP Method
                          </FormLabel>
                          <SelectDropdown
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                            placeholder='Select method'
                            className='col-span-4'
                            items={httpMethods}
                          />
                          <FormMessage className='col-span-4 col-start-3' />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <div className='space-y-4'>
                    <h3 className='text-sm font-semibold'>Authentication</h3>
                    <FormField
                      control={form.control}
                      name='authType'
                      render={({ field }) => (
                        <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                          <FormLabel className='col-span-2 text-end'>
                            Auth Type
                          </FormLabel>
                          <SelectDropdown
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                            placeholder='Select auth type'
                            className='col-span-4'
                            items={authTypes}
                          />
                          <FormMessage className='col-span-4 col-start-3' />
                        </FormItem>
                      )}
                    />
                    {showAuthFields && (
                      <>
                        <FormField
                          control={form.control}
                          name='authHeaderName'
                          render={({ field }) => (
                            <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                              <FormLabel className='col-span-2 text-end'>
                                Header Name <span className='text-destructive'>*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='Authorization, X-API-Key, etc.'
                                  className='col-span-4'
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className='col-span-4 col-start-3' />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name='authHeaderValue'
                          render={({ field }) => (
                            <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                              <FormLabel className='col-span-2 text-end'>
                                Header Value
                              </FormLabel>
                              <FormControl>
                                <PasswordInput
                                  placeholder={
                                    authType === 'bearer'
                                      ? 'Bearer token123'
                                      : authType === 'basic'
                                        ? 'Basic base64encoded'
                                        : 'Your auth value'
                                  }
                                  className='col-span-4'
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription className='col-span-4 col-start-3 text-xs'>
                                {isEdit && 'Leave empty to keep current value'}
                              </FormDescription>
                              <FormMessage className='col-span-4 col-start-3' />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                  </div>

                  <Separator />

                  <div className='space-y-4'>
                    <h3 className='text-sm font-semibold'>Retry Configuration</h3>
                    <FormField
                      control={form.control}
                      name='maxRetries'
                      render={({ field }) => (
                        <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                          <FormLabel className='col-span-2 text-end'>
                            Max Retries
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              min={0}
                              max={10}
                              className='col-span-4'
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className='col-span-4 col-start-3 text-xs'>
                            0-10 (default: 3)
                          </FormDescription>
                          <FormMessage className='col-span-4 col-start-3' />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='retryDelaySeconds'
                      render={({ field }) => (
                        <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                          <FormLabel className='col-span-2 text-end'>
                            Retry Delay (seconds)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              min={1}
                              max={3600}
                              className='col-span-4'
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className='col-span-4 col-start-3 text-xs'>
                            1-3600 (default: 60)
                          </FormDescription>
                          <FormMessage className='col-span-4 col-start-3' />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='timeoutSeconds'
                      render={({ field }) => (
                        <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                          <FormLabel className='col-span-2 text-end'>
                            Timeout (seconds)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              min={1}
                              max={300}
                              className='col-span-4'
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className='col-span-4 col-start-3 text-xs'>
                            1-300 (default: 30)
                          </FormDescription>
                          <FormMessage className='col-span-4 col-start-3' />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <div className='space-y-4'>
                    <h3 className='text-sm font-semibold'>Advanced Settings</h3>
                    <FormField
                      control={form.control}
                      name='customHeaders'
                      render={({ field }) => (
                        <FormItem className='grid grid-cols-6 items-start space-y-0 gap-x-4 gap-y-1'>
                          <FormLabel className='col-span-2 text-end pt-2'>
                            Custom Headers
                          </FormLabel>
                          <div className='col-span-4 space-y-1'>
                            <FormControl>
                              <Textarea
                                placeholder='{"X-Custom-Header": "value"}'
                                className='font-mono text-sm'
                                rows={4}
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className='text-xs'>
                              JSON object with key-value pairs
                            </FormDescription>
                            {customHeadersError && (
                              <p className='text-xs text-destructive'>
                                {customHeadersError}
                              </p>
                            )}
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='endpointIsActive'
                      render={({ field }) => (
                        <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                          <FormLabel className='col-span-2 text-end'>
                            Active
                          </FormLabel>
                          <FormControl>
                            <div className='col-span-4 flex items-center space-x-2'>
                              <Switch
                                checked={field.value ?? true}
                                onCheckedChange={field.onChange}
                              />
                              <span className='text-sm text-muted-foreground'>
                                {field.value ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage className='col-span-4 col-start-3' />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type='submit' form='destination-endpoint-form'>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

