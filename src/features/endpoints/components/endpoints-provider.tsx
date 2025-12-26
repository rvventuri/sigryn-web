import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type Endpoint } from '../data/schema'

type EndpointsDialogType = 'add' | 'edit' | 'delete'

type EndpointsContextType = {
  open: EndpointsDialogType | null
  setOpen: (str: EndpointsDialogType | null) => void
  currentRow: Endpoint | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Endpoint | null>>
}

const EndpointsContext = React.createContext<EndpointsContextType | null>(null)

export function EndpointsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useDialogState<EndpointsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Endpoint | null>(null)

  return (
    <EndpointsContext.Provider
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      {children}
    </EndpointsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useEndpoints = () => {
  const endpointsContext = React.useContext(EndpointsContext)

  if (!endpointsContext) {
    throw new Error(
      'useEndpoints has to be used within <EndpointsProvider>'
    )
  }

  return endpointsContext
}

