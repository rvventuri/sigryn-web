'use client'

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
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { destinationsApi } from '@/lib/destinations-api'
import { type Destination } from '../data/schema'

const formSchema = z.object({
  name: z.string().min(1, 'Name is required.').max(255, 'Name must be at most 255 characters.'),
  provider: z.string().max(100, 'Provider must be at most 100 characters.').optional().or(z.literal('')),
  description: z.string().optional().or(z.literal('')),
  isActive: z.boolean().optional(),
})

type DestinationForm = z.infer<typeof formSchema>

type DestinationActionDialogProps = {
  currentRow?: Destination
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DestinationsActionDialog({
  currentRow,
  open,
  onOpenChange,
}: DestinationActionDialogProps) {
  const isEdit = !!currentRow
  const queryClient = useQueryClient()

  const form = useForm<DestinationForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          name: currentRow.name,
          provider: currentRow.provider || '',
          description: currentRow.description || '',
          isActive: currentRow.isActive,
        }
      : {
          name: '',
          provider: '',
          description: '',
          isActive: true,
        },
  })

  const onSubmit = async (values: DestinationForm) => {
    try {
      if (isEdit && currentRow) {
        await destinationsApi.update(currentRow.id, {
          name: values.name,
          provider: values.provider || undefined,
          description: values.description || undefined,
          isActive: values.isActive,
        })
        toast.success('Destination updated successfully')
      } else {
        await destinationsApi.create({
          name: values.name,
          provider: values.provider || undefined,
          description: values.description || undefined,
        })
        toast.success('Destination created successfully')
      }
      
      // Invalidate and refetch destinations
      await queryClient.invalidateQueries({ queryKey: ['destinations'] })
      
      form.reset()
      onOpenChange(false)
    } catch (error) {
      toast.error('Failed to save destination')
      console.error(error)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-start'>
          <DialogTitle>
            {isEdit ? 'Edit Destination' : 'Create New Destination'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update the destination here. '
              : 'Create new destination here. '}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className='h-auto max-h-[calc(100vh-200px)] overflow-y-auto py-1 pe-3'>
          <Form {...form}>
            <form
              id='destination-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 px-0.5'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>Name</FormLabel>
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
                        placeholder='Webhook endpoint description'
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
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type='submit' form='destination-form'>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

