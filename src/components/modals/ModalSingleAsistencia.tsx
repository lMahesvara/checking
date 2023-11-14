import { Asistencia } from '@/types'
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from '@nextui-org/react'
import { useAsyncList } from '@react-stately/data'
import { useEffect, useState } from 'react'

type Props = {
  isOpen: boolean
  onOpenChange: () => void
  handleAddAsistencia?: (asistencia: Asistencia) => void
  onClose: () => void
  asistencia: Asistencia
  isReadOnly?: boolean
}

const columns = [
  {
    key: 'alumno',
    label: 'Nombre',
  },
  {
    key: 'asistencia',
    label: 'Asistencia',
  },
]

const ModalSingleAsistencia = ({
  isOpen,
  onClose,
  onOpenChange,
  asistencia,
  handleAddAsistencia,
  isReadOnly = false,
}: Props) => {
  const [isLoading, setIsLoading] = useState(true)

  let list = useAsyncList({
    load() {
      const rows =
        asistencia?.alumnos
          ?.map(alumno => {
            return {
              key: alumno.alumno,
              alumno: alumno.alumno,
              asistencia: alumno.presente ? 'Presente' : 'Ausente',
            }
          })
          .toSorted((a, b) => (a.alumno > b.alumno ? 1 : -1)) ?? []
      setIsLoading(false)
      return { items: rows }
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column as keyof typeof a]
          let second = b[sortDescriptor.column as keyof typeof b]
          let cmp =
            (parseInt(first) || first) > (parseInt(second) || second) ? 1 : -1

          if (sortDescriptor.direction === 'ascending') {
            cmp *= -1
          }

          return cmp
        }),
      }
    },
  })

  useEffect(() => {
    const reload = () => {
      setIsLoading(true)
      list.reload()
      setIsLoading(false)
    }
    reload()
  }, [asistencia])

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      size="xl"
      aria-label={
        isReadOnly
          ? `Asistencia de la fecha ${asistencia.fecha}`
          : `Agregar asistencia de la fecha ${asistencia.fecha}`
      }
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="text-center">
              Asistencia - {asistencia.fecha}
            </ModalHeader>
            <Table
              isStriped
              sortDescriptor={list.sortDescriptor}
              onSortChange={list.sort}
              isHeaderSticky
              radius="none"
              aria-label={`Asistencia de la fecha ${asistencia.fecha}`}
            >
              <TableHeader columns={columns}>
                {column => (
                  <TableColumn key={column.key} allowsSorting>
                    {column.label}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody
                items={list.items}
                isLoading={isLoading}
                loadingContent={<Spinner label="Cargando..." />}
              >
                {item => (
                  <TableRow key={item.key}>
                    {columnKey => (
                      <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
            {!isReadOnly && (
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    handleAddAsistencia?.(asistencia)
                    onClose()
                  }}
                >
                  Agregar asistencia
                </Button>
              </ModalFooter>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
export default ModalSingleAsistencia
