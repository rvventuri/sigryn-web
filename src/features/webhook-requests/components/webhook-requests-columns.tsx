import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronRight, RotateCw, Loader2 } from 'lucide-react'
import type { WebhookRequest } from '@/lib/dashboard-api'
import { Link } from '@tanstack/react-router'
import { webhooksRetryApi } from '@/lib/webhooks-retry-api'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'

function RetryWebhookButton({ webhookRequest }: { webhookRequest: WebhookRequest }) {
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()

  const handleRetry = async (onlyFailed: boolean = false) => {
    setIsLoading(true)
    try {
      const response = await webhooksRetryApi.retryWebhookRequest(
        webhookRequest.id,
        { onlyFailed }
      )
      toast.success(
        `Retry initiated. ${response.forwardsCreated} forward(s) created.`
      )
      // Invalidate queries to refresh data
      await queryClient.invalidateQueries({ queryKey: ['webhook-requests'] })
      await queryClient.invalidateQueries({
        queryKey: ['dashboard-recent-webhooks'],
      })
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to retry webhook request'
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const hasFailedForwards =
    webhookRequest.forwards?.some((f) => f.status === 'failed') || false

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='h-8 w-8' disabled={isLoading}>
          {isLoading ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            <MoreHorizontal className='h-4 w-4' />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => handleRetry(false)}>
          <RotateCw className='mr-2 h-4 w-4' />
          Retry All Endpoints
        </DropdownMenuItem>
        {hasFailedForwards && (
          <DropdownMenuItem onClick={() => handleRetry(true)}>
            <RotateCw className='mr-2 h-4 w-4' />
            Retry Failed Only
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const webhookRequestsColumns: ColumnDef<WebhookRequest>[] = [
  {
    id: 'expand',
    header: () => null,
    cell: ({ row }) => {
      const isExpanded = row.getIsExpanded()

      return (
        <Button
          variant='ghost'
          size='icon'
          className='h-8 w-8'
          onClick={() => row.toggleExpanded()}
        >
          {isExpanded ? (
            <ChevronDown className='h-4 w-4' />
          ) : (
            <ChevronRight className='h-4 w-4' />
          )}
        </Button>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'receivedAt',
    header: 'Received At',
    cell: ({ row }) => {
      const date = new Date(row.original.receivedAt)
      return (
        <div className='text-sm'>
          {new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }).format(date)}
        </div>
      )
    },
  },
  {
    accessorKey: 'destination.name',
    header: 'Destination',
    cell: ({ row }) => {
      const destination = row.original.destination
      return (
        <Link
          to='/destinations/$destinationId/endpoints'
          params={{ destinationId: destination.id }}
          className='text-sm font-medium hover:underline'
        >
          {destination.name}
        </Link>
      )
    },
  },
  {
    accessorKey: 'method',
    header: 'Method',
    cell: ({ row }) => {
      return (
        <Badge variant='outline' className='font-mono'>
          {row.original.method}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'sourceIp',
    header: 'Source IP',
    cell: ({ row }) => {
      return <code className='text-xs'>{row.original.sourceIp}</code>
    },
  },
  {
    accessorKey: 'isValidSignature',
    header: 'Signature',
    cell: ({ row }) => {
      const isValid = row.original.isValidSignature
      if (isValid === null) {
        return <span className='text-xs text-muted-foreground'>—</span>
      }
      return (
        <Badge
          variant='outline'
          className={
            isValid
              ? 'border-green-500 text-green-700 dark:text-green-400'
              : 'border-red-500 text-red-700 dark:text-red-400'
          }
        >
          {isValid ? 'Valid' : 'Invalid'}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'forwards',
    header: 'Status',
    cell: ({ row }) => {
      const forwards = row.original.forwards || []
      if (forwards.length === 0) {
        return <Badge variant='outline'>Pending</Badge>
      }
      const lastForward = forwards[forwards.length - 1]
      return (
        <Badge
          variant='outline'
          className={
            lastForward.status === 'success'
              ? 'border-green-500 text-green-700 dark:text-green-400'
              : lastForward.status === 'failed'
                ? 'border-red-500 text-red-700 dark:text-red-400'
                : ''
          }
        >
          {lastForward.status}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'processingTimeMs',
    header: 'Processing Time',
    cell: ({ row }) => {
      const time = row.original.processingTimeMs
      if (time === null) {
        return <span className='text-xs text-muted-foreground'>—</span>
      }
      return <span className='text-sm'>{time}ms</span>
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return <RetryWebhookButton webhookRequest={row.original} />
    },
    enableSorting: false,
  },
]

