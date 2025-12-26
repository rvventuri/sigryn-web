import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { CalendarIcon, X } from 'lucide-react'
import { format } from 'date-fns'
import type { Destination } from '@/lib/destinations-api'
import type { WebhookRequestsFilters as Filters } from '@/lib/dashboard-api'

interface WebhookRequestsFiltersProps {
  destinations: Destination[]
  filters: Filters
  onFiltersChange: (filters: Filters) => void
  isLoading?: boolean
}

const HTTP_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']

export function WebhookRequestsFilters({
  destinations,
  filters,
  onFiltersChange,
  isLoading = false,
}: WebhookRequestsFiltersProps) {
  const [dateFrom, setDateFrom] = useState<Date | undefined>(
    filters.dateFrom ? new Date(filters.dateFrom) : undefined
  )
  const [dateTo, setDateTo] = useState<Date | undefined>(
    filters.dateTo ? new Date(filters.dateTo) : undefined
  )

  // Sync date states with filters
  useEffect(() => {
    if (filters.dateFrom && (!dateFrom || dateFrom.toISOString().split('T')[0] !== filters.dateFrom)) {
      setDateFrom(new Date(filters.dateFrom))
    } else if (!filters.dateFrom && dateFrom) {
      setDateFrom(undefined)
    }
  }, [filters.dateFrom])

  useEffect(() => {
    if (filters.dateTo && (!dateTo || dateTo.toISOString().split('T')[0] !== filters.dateTo)) {
      setDateTo(new Date(filters.dateTo))
    } else if (!filters.dateTo && dateTo) {
      setDateTo(undefined)
    }
  }, [filters.dateTo])

  const updateFilter = (key: keyof Filters, value: any) => {
    onFiltersChange({ ...filters, [key]: value, page: 1 })
  }

  const clearAllFilters = () => {
    onFiltersChange({ page: 1, limit: filters.limit || 20 })
    setDateFrom(undefined)
    setDateTo(undefined)
  }

  const handleDateFromChange = (date: Date | undefined) => {
    setDateFrom(date)
    updateFilter('dateFrom', date ? format(date, 'yyyy-MM-dd') : undefined)
  }

  const handleDateToChange = (date: Date | undefined) => {
    setDateTo(date)
    updateFilter('dateTo', date ? format(date, 'yyyy-MM-dd') : undefined)
  }

  const hasActiveFilters =
    filters.destinationId ||
    filters.method ||
    filters.sourceIp ||
    filters.isValidSignature !== undefined ||
    filters.dateFrom ||
    filters.dateTo

  return (
    <div className='flex flex-wrap items-center gap-2'>
      {/* Destination Filter */}
      <Select
        value={filters.destinationId || 'all'}
        onValueChange={(value) =>
          updateFilter('destinationId', value === 'all' ? undefined : value)
        }
        disabled={isLoading}
      >
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='All Destinations' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>All Destinations</SelectItem>
          {destinations.map((dest) => (
            <SelectItem key={dest.id} value={dest.id}>
              {dest.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Method Filter */}
      <Select
        value={filters.method || 'all'}
        onValueChange={(value) =>
          updateFilter('method', value === 'all' ? undefined : value)
        }
        disabled={isLoading}
      >
        <SelectTrigger className='w-[140px]'>
          <SelectValue placeholder='All Methods' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>All Methods</SelectItem>
          {HTTP_METHODS.map((method) => (
            <SelectItem key={method} value={method}>
              {method}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Source IP Filter */}
      <Input
        placeholder='Source IP'
        value={filters.sourceIp || ''}
        onChange={(e) => updateFilter('sourceIp', e.target.value || undefined)}
        className='w-[150px]'
        disabled={isLoading}
      />

      {/* Valid Signature Filter */}
      <Select
        value={
          filters.isValidSignature === undefined
            ? 'all'
            : filters.isValidSignature
              ? 'true'
              : 'false'
        }
        onValueChange={(value) =>
          updateFilter(
            'isValidSignature',
            value === 'all' ? undefined : value === 'true'
          )
        }
        disabled={isLoading}
      >
        <SelectTrigger className='w-[160px]'>
          <SelectValue placeholder='Signature Status' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>All Signatures</SelectItem>
          <SelectItem value='true'>Valid</SelectItem>
          <SelectItem value='false'>Invalid</SelectItem>
        </SelectContent>
      </Select>

      {/* Date From Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className={cn(
              'w-[180px] justify-start text-left font-normal',
              !dateFrom && 'text-muted-foreground'
            )}
            disabled={isLoading}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {dateFrom ? format(dateFrom, 'PPP') : <span>Date From</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            mode='single'
            selected={dateFrom}
            onSelect={handleDateFromChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* Date To Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className={cn(
              'w-[180px] justify-start text-left font-normal',
              !dateTo && 'text-muted-foreground'
            )}
            disabled={isLoading}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {dateTo ? format(dateTo, 'PPP') : <span>Date To</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            mode='single'
            selected={dateTo}
            onSelect={handleDateToChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <Button
          variant='ghost'
          size='sm'
          onClick={clearAllFilters}
          disabled={isLoading}
        >
          <X className='mr-2 h-4 w-4' />
          Clear Filters
        </Button>
      )}
    </div>
  )
}

