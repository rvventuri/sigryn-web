import { EndpointsActionDialog } from './endpoints-action-dialog'
import { EndpointsDeleteDialog } from './endpoints-delete-dialog'
import { useEndpoints } from './endpoints-provider'

type EndpointsDialogsProps = {
  destinationId: string
}

export function EndpointsDialogs({ destinationId }: EndpointsDialogsProps) {
  const { open, setOpen, currentRow, setCurrentRow } = useEndpoints()
  return (
    <>
      <EndpointsActionDialog
        key='endpoint-add'
        destinationId={destinationId}
        open={open === 'add'}
        onOpenChange={(state) => {
          setOpen(state ? 'add' : null)
        }}
      />

      {currentRow && (
        <>
          <EndpointsActionDialog
            key={`endpoint-edit-${currentRow.id}`}
            destinationId={destinationId}
            open={open === 'edit'}
            onOpenChange={(state) => {
              setOpen(state ? 'edit' : null)
              if (!state) {
                setTimeout(() => {
                  setCurrentRow(null)
                }, 500)
              }
            }}
            currentRow={currentRow}
          />

          <EndpointsDeleteDialog
            key={`endpoint-delete-${currentRow.id}`}
            destinationId={destinationId}
            open={open === 'delete'}
            onOpenChange={(state) => {
              setOpen(state ? 'delete' : null)
              if (!state) {
                setTimeout(() => {
                  setCurrentRow(null)
                }, 500)
              }
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}

