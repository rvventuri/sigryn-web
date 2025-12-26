import { type ColumnDef } from '@tanstack/react-table'
import { Link } from '@tanstack/react-router'
import { Settings, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { type Destination } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'
import { CopyUrlButton } from './copy-url-button'

export const destinationsColumns: ColumnDef<Destination>[] = [
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
    cell: ({ row }) => (
      <LongText className='max-w-36 ps-3'>{row.getValue('name')}</LongText>
    ),
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
        'ps-0.5 max-md:sticky start-6 @4xl/content:table-cell @4xl/content:drop-shadow-none'
      ),
    },
    enableHiding: false,
  },
  {
    accessorKey: 'provider',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Provider' />
    ),
    cell: ({ row }) => {
      const provider = row.getValue('provider') as string | null
      return (
        <div className='ps-2'>
          {provider ? (
            <Badge variant='outline' className='capitalize'>
              {provider}
            </Badge>
          ) : (
            <span className='text-muted-foreground'>—</span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'publicUrl',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Public URL' />
    ),
    cell: ({ row }) => {
      const url = row.getValue('publicUrl') as string
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
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Description' />
    ),
    cell: ({ row }) => {
      const description = row.getValue('description') as string | null
      return (
        <div className='ps-2'>
          {description ? (
            <LongText className='max-w-[200px]'>{description}</LongText>
          ) : (
            <span className='text-muted-foreground'>—</span>
          )}
        </div>
      )
    },
    enableSorting: false,
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
    id: 'actions-column',
    header: () => <div className='text-center'>Actions</div>,
    cell: ({ row }) => {
      const destination = row.original
      return (
        <div className='flex justify-center gap-2'>
          <Link
            to='/destinations/$destinationId/dashboard'
            params={{ destinationId: destination.id }}
          >
            <Button variant='ghost' size='sm' className='space-x-1'>
              <BarChart3 className='h-4 w-4' />
              <span>Dashboard</span>
            </Button>
          </Link>
          <Link
            to='/destinations/$destinationId/endpoints'
            params={{ destinationId: destination.id }}
          >
            <Button variant='ghost' size='sm' className='space-x-1'>
              <Settings className='h-4 w-4' />
              <span>Endpoints</span>
            </Button>
          </Link>
        </div>
      )
    },
    enableSorting: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableHiding: false,
  },
]

