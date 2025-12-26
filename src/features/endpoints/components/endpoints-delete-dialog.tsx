'use client'

import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { endpointsApi } from '@/lib/endpoints-api'
import { type Endpoint } from '../data/schema'

type EndpointDeleteDialogProps = {
  destinationId: string
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Endpoint
}

export function EndpointsDeleteDialog({
  destinationId,
  open,
  onOpenChange,
  currentRow,
}: EndpointDeleteDialogProps) {
  const [value, setValue] = useState('')
  const queryClient = useQueryClient()
  const endpointName = currentRow.name || currentRow.targetUrl

  const handleDelete = async () => {
    if (value.trim() !== endpointName) return

    try {
      await endpointsApi.delete(destinationId, currentRow.id)
      toast.success('Endpoint deleted successfully')

      // Invalidate and refetch endpoints
      await queryClient.invalidateQueries({
        queryKey: ['endpoints', destinationId],
      })

      onOpenChange(false)
      setValue('')
    } catch (error: any) {
      toast.error('Failed to delete endpoint')
      console.error(error)
    }
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== endpointName}
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='me-1 inline-block stroke-destructive'
            size={18}
          />{' '}
          Delete Endpoint
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Are you sure you want to delete{' '}
            <span className='font-bold'>{endpointName}</span>?
            <br />
            This action will permanently remove this endpoint from the system.
            This cannot be undone.
          </p>

          <Label className='my-2'>
            Endpoint name or URL:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Enter endpoint name or URL to confirm deletion.'
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

