import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEndpoints } from './endpoints-provider'

export function EndpointsPrimaryButtons() {
  const { setOpen } = useEndpoints()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add Endpoint</span> <Plus size={18} />
      </Button>
    </div>
  )
}

