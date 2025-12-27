'use client'

import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { destinationsApi } from '@/lib/destinations-api'
import { endpointsApi } from '@/lib/endpoints-api'
import { type Destination } from '../data/schema'

type DestinationDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Destination
}

export function DestinationsDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: DestinationDeleteDialogProps) {
  const [value, setValue] = useState('')
  const queryClient = useQueryClient()

  const handleDelete = async () => {
    if (value.trim() !== currentRow.name) return

    try {
      // Delete all endpoints first
      try {
        const endpoints = await endpointsApi.getAll(currentRow.id)
        for (const endpoint of endpoints) {
          await endpointsApi.delete(currentRow.id, endpoint.id)
        }
      } catch (error) {
        // If endpoints don't exist or already deleted, continue
        console.log('No endpoints to delete or already deleted')
      }

      // Then delete destination
      await destinationsApi.delete(currentRow.id)
      toast.success('Destination and endpoint deleted successfully')
      
      // Invalidate and refetch destinations
      await queryClient.invalidateQueries({ queryKey: ['destinations'] })
      await queryClient.invalidateQueries({ queryKey: ['endpoints', currentRow.id] })
      
      onOpenChange(false)
      setValue('')
    } catch (error) {
      toast.error('Failed to delete destination and endpoint')
      console.error(error)
    }
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.name}
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='me-1 inline-block stroke-destructive'
            size={18}
          />{' '}
          Delete Destination
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Are you sure you want to delete{' '}
            <span className='font-bold'>{currentRow.name}</span>?
            <br />
            This action will permanently remove this destination and its associated endpoint from the system.
            This cannot be undone.
          </p>

          <Label className='my-2'>
            Destination name:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Enter destination name to confirm deletion.'
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be careful, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText='Delete'
      destructive
    />
  )
}

