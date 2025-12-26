import { useState } from 'react'
import {
  type SortingState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
  type ExpandedState,
} from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { WebhookRequest } from '@/lib/dashboard-api'
import { webhookRequestsColumns } from './webhook-requests-columns'
import { WebhookDetails } from './webhook-details'

interface WebhookRequestsTableProps {
  data: WebhookRequest[]
  isLoading?: boolean
}

export function WebhookRequestsTable({
  data,
  isLoading = false,
}: WebhookRequestsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [expanded, setExpanded] = useState<ExpandedState>({})

  const table = useReactTable({
    data,
    columns: webhookRequestsColumns,
    state: {
      sorting,
      expanded,
    },
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    enableExpanding: true,
  })

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={cn(header.column.columnDef.meta?.className)}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={webhookRequestsColumns.length}
                className='h-24 text-center'
              >
                Loading...
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              const isExpanded = row.getIsExpanded()
              return (
                <>
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cn(cell.column.columnDef.meta?.className)}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  {isExpanded && (
                    <TableRow key={`${row.id}-details`} className='hover:bg-transparent'>
                      <TableCell
                        colSpan={webhookRequestsColumns.length}
                        className='p-0 border-t'
                      >
                        <WebhookDetails webhook={row.original} />
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={webhookRequestsColumns.length}
                className='h-24 text-center'
              >
                No webhook requests found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

