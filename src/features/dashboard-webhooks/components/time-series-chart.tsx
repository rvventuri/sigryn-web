import { useState } from 'react'
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Legend, Tooltip } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { dashboardApi } from '@/lib/dashboard-api'
import { useQuery } from '@tanstack/react-query'

interface TimeSeriesChartProps {
  destinationId: string
}

const dayOptions = [
  { label: 'Last 7 Days', value: 7 },
  { label: 'Last 30 Days', value: 30 },
  { label: 'Last 90 Days', value: 90 },
  { label: 'Last 365 Days', value: 365 },
]

export function TimeSeriesChart({ destinationId }: TimeSeriesChartProps) {
  const [days, setDays] = useState(30)

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-timeseries', destinationId, days],
    queryFn: () => dashboardApi.getTimeSeries(destinationId, days),
  })

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const month = monthNames[date.getMonth()]
      const day = date.getDate()
      const year = date.getFullYear()
      
      if (days <= 30) {
        return `${month} ${day}`
      } else if (days <= 90) {
        return `${month} ${day}`
      } else {
        return `${month} ${year}`
      }
    } catch {
      return dateStr
    }
  }

  const chartData = data?.map((item) => ({
    ...item,
    date: formatDate(item.date),
    dateKey: item.date,
  })) || []

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle>Webhooks Timeline</CardTitle>
            <CardDescription>
              Webhooks received and forwards over time
            </CardDescription>
          </div>
          <Select value={days.toString()} onValueChange={(v) => setDays(Number(v))}>
            <SelectTrigger className='w-[140px]'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {dayOptions.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className='px-6'>
        {isLoading ? (
          <div className='flex h-[350px] items-center justify-center'>
            <div className='text-muted-foreground'>Loading chart data...</div>
          </div>
        ) : chartData.length === 0 ? (
          <div className='flex h-[350px] items-center justify-center'>
            <div className='text-muted-foreground'>No data available</div>
          </div>
        ) : (
          <ResponsiveContainer width='100%' height={350}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id='colorWebhooks' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='currentColor' stopOpacity={0.3} className='text-primary' />
                  <stop offset='95%' stopColor='currentColor' stopOpacity={0} className='text-primary' />
                </linearGradient>
                <linearGradient id='colorSuccess' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='currentColor' stopOpacity={0.3} className='text-green-500' />
                  <stop offset='95%' stopColor='currentColor' stopOpacity={0} className='text-green-500' />
                </linearGradient>
                <linearGradient id='colorFailed' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='currentColor' stopOpacity={0.3} className='text-red-500' />
                  <stop offset='95%' stopColor='currentColor' stopOpacity={0} className='text-red-500' />
                </linearGradient>
              </defs>
              <XAxis
                dataKey='date'
                stroke='#888888'
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke='#888888'
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--background)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Area
                type='monotone'
                dataKey='count'
                stroke='currentColor'
                className='text-primary'
                fill='url(#colorWebhooks)'
                name='Webhooks Received'
              />
              <Area
                type='monotone'
                dataKey='success'
                stroke='currentColor'
                className='text-green-500'
                fill='url(#colorSuccess)'
                name='Successful Forwards'
              />
              <Area
                type='monotone'
                dataKey='failed'
                stroke='currentColor'
                className='text-red-500'
                fill='url(#colorFailed)'
                name='Failed Forwards'
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}

