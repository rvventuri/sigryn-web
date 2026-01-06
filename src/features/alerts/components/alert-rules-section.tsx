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
import { AlertRuleDialog } from './alert-rule-dialog'
import { AlertRuleRowActions } from './alert-rule-row-actions'
import { type AlertRule, alertRulesApi } from '@/lib/notifications-api'

type AlertRulesSectionProps = {
  rules: AlertRule[]
}

export function AlertRulesSection({ rules }: AlertRulesSectionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedRule, setSelectedRule] = useState<AlertRule | null>(null)
  const queryClient = useQueryClient()

  const handleCreate = () => {
    setSelectedRule(null)
    setIsDialogOpen(true)
  }

  const handleEdit = (rule: AlertRule) => {
    setSelectedRule(rule)
    setIsDialogOpen(true)
  }

  const handleToggleActive = async (rule: AlertRule) => {
    try {
      await alertRulesApi.update(rule.id, {
        isActive: !rule.isActive,
      })
      toast.success(`Alert rule ${!rule.isActive ? 'activated' : 'deactivated'}`)
      await queryClient.invalidateQueries({ queryKey: ['alert-rules'] })
    } catch (error) {
      toast.error('Failed to update alert rule')
      console.error(error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await alertRulesApi.delete(id)
      toast.success('Alert rule deleted')
      await queryClient.invalidateQueries({ queryKey: ['alert-rules'] })
    } catch (error) {
      toast.error('Failed to delete alert rule')
      console.error(error)
    }
  }

  const getConditionLabel = (condition: AlertRule['condition']) => {
    switch (condition) {
      case 'failed_forward':
        return 'Failed Forward'
      case 'multiple_failures':
        return 'Multiple Failures'
      case 'all_endpoints_failed':
        return 'All Endpoints Failed'
      case 'high_failure_rate':
        return 'High Failure Rate'
      default:
        return condition
    }
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-semibold'>Alert Rules</h3>
          <p className='text-sm text-muted-foreground'>
            Define conditions that trigger alerts when webhooks fail.
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className='mr-2 h-4 w-4' />
          Add Rule
        </Button>
      </div>

      {rules.length === 0 ? (
        <div className='rounded-lg border border-dashed p-8 text-center'>
          <p className='text-sm text-muted-foreground'>
            No alert rules configured. Add one to start monitoring webhook failures.
          </p>
        </div>
      ) : (
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Scope</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Cooldown</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className='font-medium'>{rule.name}</TableCell>
                  <TableCell>
                    <Badge variant='outline'>{getConditionLabel(rule.condition)}</Badge>
                    {rule.failureThreshold && (
                      <span className='ml-2 text-xs text-muted-foreground'>
                        (≥{rule.failureThreshold})
                      </span>
                    )}
                    {rule.failureRateThreshold && (
                      <span className='ml-2 text-xs text-muted-foreground'>
                        ({rule.failureRateThreshold}% in {rule.timeWindowMinutes}m)
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant='outline'>{rule.scope}</Badge>
                  </TableCell>
                  <TableCell>
                    {rule.destinationId ? (
                      <span className='text-sm text-muted-foreground'>
                        {rule.destinationId.slice(0, 8)}...
                      </span>
                    ) : (
                      <span className='text-sm text-muted-foreground'>Organization</span>
                    )}
                  </TableCell>
                  <TableCell className='text-sm text-muted-foreground'>
                    {rule.cooldownMinutes}m
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={rule.isActive}
                      onCheckedChange={() => handleToggleActive(rule)}
                    />
                  </TableCell>
                  <TableCell className='text-right'>
                    <AlertRuleRowActions
                      rule={rule}
                      onEdit={() => handleEdit(rule)}
                      onDelete={() => handleDelete(rule.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AlertRuleDialog
        rule={selectedRule}
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) {
            setSelectedRule(null)
          }
        }}
      />
    </div>
  )
}

