import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDestinations } from './destinations-provider'

export function DestinationsPrimaryButtons() {
  const { setOpen } = useDestinations()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add Destination</span> <Plus size={18} />
      </Button>
    </div>
  )
}

