import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { NotificationConfigDialog } from './notification-config-dialog'
import { NotificationConfigRowActions } from './notification-config-row-actions'
import {
  type NotificationConfig,
  notificationsConfigsApi,
} from '@/lib/notifications-api'

type NotificationConfigsSectionProps = {
  configs: NotificationConfig[]
}

export function NotificationConfigsSection({
  configs,
}: NotificationConfigsSectionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedConfig, setSelectedConfig] = useState<NotificationConfig | null>(null)
  const queryClient = useQueryClient()

  const handleCreate = () => {
    setSelectedConfig(null)
    setIsDialogOpen(true)
  }

  const handleEdit = (config: NotificationConfig) => {
    setSelectedConfig(config)
    setIsDialogOpen(true)
  }

  const handleToggleActive = async (config: NotificationConfig) => {
    try {
      await notificationsConfigsApi.update(config.id, {
        isActive: !config.isActive,
      })
      toast.success(
        `Notification config ${!config.isActive ? 'activated' : 'deactivated'}`
      )
      await queryClient.invalidateQueries({ queryKey: ['notification-configs'] })
    } catch (error) {
      toast.error('Failed to update notification config')
      console.error(error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await notificationsConfigsApi.delete(id)
      toast.success('Notification config deleted')
      await queryClient.invalidateQueries({ queryKey: ['notification-configs'] })
    } catch (error) {
      toast.error('Failed to delete notification config')
      console.error(error)
    }
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-semibold'>Notification Channels</h3>
          <p className='text-sm text-muted-foreground'>
            Configure Slack webhooks or email addresses to receive alerts.
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className='mr-2 h-4 w-4' />
          Add Channel
        </Button>
      </div>

      {configs.length === 0 ? (
        <div className='rounded-lg border border-dashed p-8 text-center'>
          <p className='text-sm text-muted-foreground'>
            No notification channels configured. Add one to start receiving alerts.
          </p>
        </div>
      ) : (
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Scope</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Webhook/Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {configs.map((config) => (
                <TableRow key={config.id}>
                  <TableCell className='font-medium'>
                    {config.name || 'Unnamed'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={config.channel === 'slack' ? 'default' : 'secondary'}>
                      {config.channel === 'slack' ? 'Slack' : 'Email'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant='outline'>{config.scope}</Badge>
                  </TableCell>
                  <TableCell>
                    {config.destinationId ? (
                      <span className='text-sm text-muted-foreground'>
                        {config.destinationId.slice(0, 8)}...
                      </span>
                    ) : (
                      <span className='text-sm text-muted-foreground'>Organization</span>
                    )}
                  </TableCell>
                  <TableCell className='max-w-xs truncate text-sm text-muted-foreground'>
                    {config.webhookUrl}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={config.isActive}
                      onCheckedChange={() => handleToggleActive(config)}
                    />
                  </TableCell>
                  <TableCell className='text-right'>
                    <NotificationConfigRowActions
                      config={config}
                      onEdit={() => handleEdit(config)}
                      onDelete={() => handleDelete(config.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <NotificationConfigDialog
        config={selectedConfig}
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) {
            setSelectedConfig(null)
          }
        }}
      />
    </div>
  )
}

