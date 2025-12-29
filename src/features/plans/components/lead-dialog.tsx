'use client'

import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
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
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { leadsApi } from '@/lib/leads-api'

const leadFormSchema = z.object({
  name: z.string().min(1, 'Name is required.').max(255, 'Name must be at most 255 characters.'),
  email: z.string().email('Invalid email address.').min(1, 'Email is required.'),
  phone: z.string().min(1, 'Phone is required.').max(50, 'Phone must be at most 50 characters.'),
  company: z.string().max(255, 'Company must be at most 255 characters.').optional().or(z.literal('')),
  notes: z.string().optional().or(z.literal('')),
})

type LeadForm = z.infer<typeof leadFormSchema>

type LeadDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  planName: string
  onSuccess?: () => void
}

export function LeadDialog({
  open,
  onOpenChange,
  planName,
  onSuccess,
}: LeadDialogProps) {
  const [loading, setLoading] = useState(false)

  const form = useForm<LeadForm>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      notes: '',
    },
  })

  const onSubmit = async (values: LeadForm) => {
    setLoading(true)
    try {
      await leadsApi.create({
        name: values.name,
        email: values.email,
        phone: values.phone,
        planSelected: planName,
        company: values.company || undefined,
        notes: values.notes || undefined,
        status: 'new',
      })

      toast.success('Thank you for your interest! We will contact you soon.')
      form.reset()
      onOpenChange(false)
      onSuccess?.()
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || 'Failed to submit your information'
      toast.error(
        Array.isArray(errorMessage) ? errorMessage[0] : errorMessage
      )
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        if (!loading) {
          form.reset()
          onOpenChange(state)
        }
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-start'>
          <DialogTitle>Get Started with {planName}</DialogTitle>
          <DialogDescription>
            Please provide your contact information and we&apos;ll get in touch
            with you shortly to help you get started.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id='lead-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name <span className='text-destructive'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='John Doe'
                      autoComplete='name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className='text-destructive'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='john@example.com'
                      autoComplete='email'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Phone <span className='text-destructive'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='tel'
                      placeholder='+1 (555) 123-4567'
                      autoComplete='tel'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='company'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Acme Inc.'
                      autoComplete='organization'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='notes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Tell us about your use case or any questions...'
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            type='button'
            variant='outline'
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            form='lead-form'
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Submitting...
              </>
            ) : (
              'Submit'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

