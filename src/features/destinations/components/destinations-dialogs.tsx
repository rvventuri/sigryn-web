import { DestinationEndpointActionDialog } from './destination-endpoint-action-dialog'
import { DestinationsDeleteDialog } from './destinations-delete-dialog'
import { useDestinations } from './destinations-provider'

export function DestinationsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useDestinations()
  return (
    <>
      <DestinationEndpointActionDialog
        key='destination-add'
        open={open === 'add'}
        onOpenChange={(state) => {
          setOpen(state ? 'add' : null)
        }}
      />

      {currentRow && (
        <>
          <DestinationEndpointActionDialog
            key={`destination-edit-${currentRow.id}`}
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

          <DestinationsDeleteDialog
            key={`destination-delete-${currentRow.id}`}
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

