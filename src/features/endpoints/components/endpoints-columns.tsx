import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { type Endpoint } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'
import { CopyUrlButton } from './copy-url-button'

export const endpointsColumns: ColumnDef<Endpoint>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    meta: {
      className: cn('max-md:sticky start-0 z-10 rounded-tl-[inherit]'),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => {
      const name = row.getValue('name') as string | null
      return (
        <LongText className='max-w-36 ps-3'>
          {name || <span className='text-muted-foreground'>—</span>}
        </LongText>
      )
    },
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
        'ps-0.5 max-md:sticky start-6 @4xl/content:table-cell @4xl/content:drop-shadow-none'
      ),
    },
    enableHiding: false,
  },
  {
    accessorKey: 'targetUrl',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Target URL' />
    ),
    cell: ({ row }) => {
      const url = row.getValue('targetUrl') as string
      return (
        <div className='flex items-center gap-2 ps-2'>
          <LongText className='max-w-[300px] text-sm'>{url}</LongText>
          <CopyUrlButton url={url} />
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'method',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Method' />
    ),
    cell: ({ row }) => {
      const method = row.getValue('method') as string
      const colorMap: Record<string, string> = {
        GET: 'border-blue-500 text-blue-700 dark:text-blue-400',
        POST: 'border-green-500 text-green-700 dark:text-green-400',
        PUT: 'border-yellow-500 text-yellow-700 dark:text-yellow-400',
        PATCH: 'border-orange-500 text-orange-700 dark:text-orange-400',
        DELETE: 'border-red-500 text-red-700 dark:text-red-400',
      }
      return (
        <div className='ps-2'>
          <Badge
            variant='outline'
            className={cn('font-mono', colorMap[method] || '')}
          >
            {method}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: 'authType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Auth Type' />
    ),
    cell: ({ row }) => {
      const authType = row.getValue('authType') as string | null
      return (
        <div className='ps-2'>
          {authType ? (
            <Badge variant='outline' className='capitalize'>
              {authType}
            </Badge>
          ) : (
            <span className='text-muted-foreground'>—</span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'maxRetries',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Max Retries' />
    ),
    cell: ({ row }) => {
      const maxRetries = row.getValue('maxRetries') as number
      return <div className='ps-2'>{maxRetries}</div>
    },
  },
  {
    accessorKey: 'timeoutSeconds',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Timeout (s)' />
    ),
    cell: ({ row }) => {
      const timeout = row.getValue('timeoutSeconds') as number
      return <div className='ps-2'>{timeout}s</div>
    },
  },
  {
    accessorKey: 'isActive',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const isActive = row.getValue('isActive') as boolean
      return (
        <div className='flex space-x-2 ps-2'>
          <Badge
            variant='outline'
            className={cn(
              'capitalize',
              isActive
                ? 'border-green-500 text-green-700 dark:text-green-400'
                : 'border-gray-500 text-gray-700 dark:text-gray-400'
            )}
          >
            {isActive ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableHiding: false,
  },
]

