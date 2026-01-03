import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Copy, Check, RotateCw, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import type { WebhookRequest } from '@/lib/dashboard-api'
import { webhooksRetryApi } from '@/lib/webhooks-retry-api'
import { useQueryClient } from '@tanstack/react-query'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

function RetryForwardButton({ forwardId }: { forwardId: string }) {
  const [isRetrying, setIsRetrying] = useState(false)
  const queryClient = useQueryClient()

  const handleRetry = async () => {
    setIsRetrying(true)
    try {
      await webhooksRetryApi.retryForward(forwardId)
      toast.success('Forward retry initiated successfully')
      // Invalidate queries to refresh data
      await queryClient.invalidateQueries({ queryKey: ['webhook-requests'] })
      await queryClient.invalidateQueries({
        queryKey: ['dashboard-recent-webhooks'],
      })
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to retry forward'
      toast.error(errorMessage)
    } finally {
      setIsRetrying(false)
    }
  }

  return (
    <Button
      variant='outline'
      size='sm'
      className='mt-2'
      onClick={handleRetry}
      disabled={isRetrying}
    >
      {isRetrying ? (
        <>
          <Loader2 className='mr-2 h-3 w-3 animate-spin' />
          Retrying...
        </>
      ) : (
        <>
          <RotateCw className='mr-2 h-3 w-3' />
          Retry Forward
        </>
      )}
    </Button>
  )
}

interface WebhookDetailsProps {
  webhook: WebhookRequest
}

export function WebhookDetails({ webhook }: WebhookDetailsProps) {
  const [copied, setCopied] = useState<string | null>(null)
  const [isRetrying, setIsRetrying] = useState(false)
  const queryClient = useQueryClient()

  const handleRetry = async (onlyFailed: boolean = false) => {
    setIsRetrying(true)
    try {
      const response = await webhooksRetryApi.retryWebhookRequest(
        webhook.id,
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
      setIsRetrying(false)
    }
  }

  const hasFailedForwards =
    webhook.forwards?.some((f) => f.status === 'failed') || false

  const copyToClipboard = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(label)
    toast.success(`Copied ${label} to clipboard`)
    setTimeout(() => setCopied(null), 2000)
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '—'
    try {
      const date = new Date(dateStr)
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
      }).format(date)
    } catch {
      return dateStr
    }
  }

  const formatJSON = (obj: any) => {
    try {
      if (typeof obj === 'string') {
        return JSON.stringify(JSON.parse(obj), null, 2)
      }
      return JSON.stringify(obj, null, 2)
    } catch {
      return typeof obj === 'string' ? obj : JSON.stringify(obj)
    }
  }

  const isJSON = (str: string) => {
    try {
      JSON.parse(str)
      return true
    } catch {
      return false
    }
  }

  return (
    <div className='space-y-4 p-4 bg-muted/50 border-t'>
      {/* Retry Actions */}
      <div className='flex items-center justify-between pb-2 border-b'>
        <h4 className='text-sm font-semibold'>Actions</h4>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' size='sm' disabled={isRetrying}>
              {isRetrying ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Retrying...
                </>
              ) : (
                <>
                  <RotateCw className='mr-2 h-4 w-4' />
                  Retry
                </>
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
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        {/* Basic Info */}
        <div className='space-y-2'>
          <h4 className='text-sm font-semibold'>Request Information</h4>
          <div className='space-y-1 text-sm'>
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>Webhook ID:</span>
              <code className='text-xs'>{webhook.id}</code>
            </div>
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>Destination:</span>
              <code className='text-xs'>{webhook.destination.name}</code>
            </div>
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>Method:</span>
              <Badge variant='outline' className='font-mono'>
                {webhook.method}
              </Badge>
            </div>
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>Source IP:</span>
              <code className='text-xs'>{webhook.sourceIp}</code>
            </div>
            {webhook.userAgent && (
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>User Agent:</span>
                <code className='text-xs max-w-[200px] truncate'>
                  {webhook.userAgent}
                </code>
              </div>
            )}
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>Body Size:</span>
              <span>{(webhook.bodySizeBytes / 1024).toFixed(2)} KB</span>
            </div>
            {webhook.processingTimeMs !== null && (
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Processing Time:</span>
                <span>{webhook.processingTimeMs}ms</span>
              </div>
            )}
          </div>
        </div>

        {/* Timestamps */}
        <div className='space-y-2'>
          <h4 className='text-sm font-semibold'>Timestamps</h4>
          <div className='space-y-1 text-sm'>
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>Received At:</span>
              <span className='text-xs'>{formatDate(webhook.receivedAt)}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>Processed At:</span>
              <span className='text-xs'>{formatDate(webhook.processedAt)}</span>
            </div>
          </div>

          {/* Signature */}
          {webhook.signature && (
            <>
              <Separator className='my-2' />
              <div className='space-y-1 text-sm'>
                <h4 className='text-sm font-semibold'>Signature</h4>
                <div className='flex justify-between items-center'>
                  <span className='text-muted-foreground'>Valid:</span>
                  <Badge
                    variant='outline'
                    className={
                      webhook.isValidSignature === true
                        ? 'border-green-500 text-green-700 dark:text-green-400'
                        : webhook.isValidSignature === false
                          ? 'border-red-500 text-red-700 dark:text-red-400'
                          : ''
                    }
                  >
                    {webhook.isValidSignature === null
                      ? 'Not checked'
                      : webhook.isValidSignature
                        ? 'Valid'
                        : 'Invalid'}
                  </Badge>
                </div>
                <div className='flex items-start justify-between gap-2'>
                  <code className='text-xs break-all flex-1 font-mono'>
                    {webhook.signature}
                  </code>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-6 w-6 flex-shrink-0'
                    onClick={() => copyToClipboard(webhook.signature!, 'signature')}
                  >
                    {copied === 'signature' ? (
                      <Check className='h-3 w-3' />
                    ) : (
                      <Copy className='h-3 w-3' />
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <Separator />

      {/* Headers */}
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <h4 className='text-sm font-semibold'>Headers</h4>
          <Button
            variant='ghost'
            size='sm'
            onClick={() =>
              copyToClipboard(formatJSON(webhook.headers), 'headers')
            }
          >
            {copied === 'headers' ? (
              <Check className='h-3 w-3 mr-1' />
            ) : (
              <Copy className='h-3 w-3 mr-1' />
            )}
            Copy
          </Button>
        </div>
        <pre className='text-xs bg-background border rounded-md p-3 overflow-x-auto font-mono'>
          {formatJSON(webhook.headers)}
        </pre>
      </div>

      {/* Query Params */}
      {webhook.queryParams && Object.keys(webhook.queryParams).length > 0 && (
        <>
          <Separator />
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <h4 className='text-sm font-semibold'>Query Parameters</h4>
              <Button
                variant='ghost'
                size='sm'
                onClick={() =>
                  copyToClipboard(formatJSON(webhook.queryParams), 'queryParams')
                }
              >
                {copied === 'queryParams' ? (
                  <Check className='h-3 w-3 mr-1' />
                ) : (
                  <Copy className='h-3 w-3 mr-1' />
                )}
                Copy
              </Button>
            </div>
            <pre className='text-xs bg-background border rounded-md p-3 overflow-x-auto font-mono'>
              {formatJSON(webhook.queryParams)}
            </pre>
          </div>
        </>
      )}

      {/* Body */}
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <h4 className='text-sm font-semibold'>Request Body</h4>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => copyToClipboard(webhook.body, 'body')}
          >
            {copied === 'body' ? (
              <Check className='h-3 w-3 mr-1' />
            ) : (
              <Copy className='h-3 w-3 mr-1' />
            )}
            Copy
          </Button>
        </div>
        <pre
          className={`text-xs bg-background border rounded-md p-3 overflow-x-auto max-h-[300px] overflow-y-auto font-mono ${
            isJSON(webhook.body) ? 'whitespace-pre-wrap' : ''
          }`}
        >
          {isJSON(webhook.body)
            ? formatJSON(webhook.body)
            : webhook.body || '(empty)'}
        </pre>
      </div>

      {/* Forwards */}
      {webhook.forwards && webhook.forwards.length > 0 && (
        <>
          <Separator />
          <div className='space-y-2'>
            <h4 className='text-sm font-semibold'>Forwards</h4>
            <div className='space-y-2'>
              {webhook.forwards.map((forward) => (
                <div
                  key={forward.id}
                  className='border rounded-md p-3 bg-background'
                >
                  <div className='flex items-center justify-between mb-2'>
                    <Badge
                      variant='outline'
                      className={
                        forward.status === 'success'
                          ? 'border-green-500 text-green-700 dark:text-green-400'
                          : forward.status === 'failed'
                            ? 'border-red-500 text-red-700 dark:text-red-400'
                            : ''
                      }
                    >
                      {forward.status}
                    </Badge>
                    {forward.responseStatusCode && (
                      <code className='text-xs'>
                        {forward.responseStatusCode}
                      </code>
                    )}
                  </div>
                  <div className='text-xs text-muted-foreground'>
                    Sent at: {formatDate(forward.sentAt)}
                  </div>
                  {forward.errorMessage && (
                    <div className='mt-2 text-xs text-red-600 dark:text-red-400'>
                      Error: {forward.errorMessage}
                    </div>
                  )}
                  {forward.status === 'failed' && (
                    <RetryForwardButton forwardId={forward.id} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

