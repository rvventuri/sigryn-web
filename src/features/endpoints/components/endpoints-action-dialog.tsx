// @ts-nocheck - react-hook-form type inference issues with zodResolver
'use client'

import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
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
import { endpointsApi } from '@/lib/endpoints-api'
import type { Endpoint, HttpMethod, AuthType } from '../data/schema'

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
    targetUrl: z.string().url('Must be a valid URL').max(500, 'URL must be at most 500 characters'),
    name: z.string().max(255, 'Name must be at most 255 characters').optional().or(z.literal('')),
    method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']).optional(),
    authType: z.enum(['none', 'bearer', 'basic', 'api_key', 'custom']).optional(),
    authHeaderName: z.string().max(100, 'Header name must be at most 100 characters').optional().or(z.literal('')),
    authHeaderValue: z.string().optional().or(z.literal('')),
    maxRetries: z.coerce.number().min(0).max(10).optional(),
    retryDelaySeconds: z.coerce.number().min(1).max(3600).optional(),
    timeoutSeconds: z.coerce.number().min(1).max(300).optional(),
    customHeaders: z.string().optional(),
    isActive: z.boolean().optional(),
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

type EndpointForm = z.infer<typeof formSchema>

type EndpointActionDialogProps = {
  destinationId: string
  currentRow?: Endpoint
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EndpointsActionDialog({
  destinationId,
  currentRow,
  open,
  onOpenChange,
}: EndpointActionDialogProps) {
  const isEdit = !!currentRow
  const queryClient = useQueryClient()
  const [customHeadersError, setCustomHeadersError] = useState<string>('')

  const form = useForm<EndpointForm>({
    // @ts-expect-error - zodResolver type inference issue with react-hook-form
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          targetUrl: currentRow.targetUrl,
          name: currentRow.name || '',
          method: currentRow.method,
          authType: (currentRow.authType as AuthType) || 'none',
          authHeaderName: currentRow.authHeaderName || '',
          authHeaderValue: '', // Never populate for security
          maxRetries: currentRow.maxRetries,
          retryDelaySeconds: currentRow.retryDelaySeconds,
          timeoutSeconds: currentRow.timeoutSeconds,
          customHeaders: currentRow.customHeaders
            ? JSON.stringify(currentRow.customHeaders, null, 2)
            : '',
          isActive: currentRow.isActive,
        }
      : {
          targetUrl: '',
          name: '',
          method: 'POST',
          authType: 'none',
          authHeaderName: '',
          authHeaderValue: '',
          maxRetries: 3,
          retryDelaySeconds: 60,
          timeoutSeconds: 30,
          customHeaders: '',
          isActive: true,
        },
  })

  const authType = form.watch('authType')
  const showAuthFields = authType && authType !== 'none'

  const onSubmit = async (values: EndpointForm) => {
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

      const payload = {
        targetUrl: values.targetUrl,
        name: values.name || undefined,
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
        isActive: values.isActive ?? true,
      }

      if (isEdit && currentRow) {
        await endpointsApi.update(destinationId, currentRow.id, payload)
        toast.success('Endpoint updated successfully')
      } else {
        await endpointsApi.create(destinationId, payload)
        toast.success('Endpoint created successfully')
      }

      // Invalidate and refetch endpoints
      await queryClient.invalidateQueries({
        queryKey: ['endpoints', destinationId],
      })

      form.reset()
      onOpenChange(false)
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || 'Failed to save endpoint'
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
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col'>
        <DialogHeader className='text-start'>
          <DialogTitle>
            {isEdit ? 'Edit Endpoint' : 'Create New Endpoint'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update the endpoint configuration here. '
              : 'Configure a new endpoint to receive webhooks. '}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className='flex-1 overflow-y-auto py-1 pe-3'>
          <Form {...form}>
            <form
              id='endpoint-form'
              onSubmit={form.handleSubmit(onSubmit as any)}
              className='space-y-6 px-0.5'
            >
              {/* Basic Information */}
              <div className='space-y-4'>
                <h3 className='text-sm font-semibold'>Basic Information</h3>
                {/* @ts-expect-error - react-hook-form type inference issue */}
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
                {/* @ts-expect-error - react-hook-form type inference issue */}
                <FormField
                  control={form.control}
                  name='name'
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
                {/* @ts-expect-error - react-hook-form type inference issue */}
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

              {/* Authentication */}
              <div className='space-y-4'>
                <h3 className='text-sm font-semibold'>Authentication</h3>
                {/* @ts-expect-error - react-hook-form type inference issue */}
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

              {/* Retry Configuration */}
              <div className='space-y-4'>
                <h3 className='text-sm font-semibold'>Retry Configuration</h3>
                {/* @ts-expect-error - react-hook-form type inference issue */}
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
                {/* @ts-expect-error - react-hook-form type inference issue */}
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
                {/* @ts-expect-error - react-hook-form type inference issue */}
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

              {/* Advanced Settings */}
              <div className='space-y-4'>
                <h3 className='text-sm font-semibold'>Advanced Settings</h3>
                {/* @ts-expect-error - react-hook-form type inference issue */}
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
                {/* @ts-expect-error - react-hook-form type inference issue */}
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
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type='submit' form='endpoint-form'>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

