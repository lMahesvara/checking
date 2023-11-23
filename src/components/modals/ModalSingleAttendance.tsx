import { columnsSingleAttendance } from '@/config/attendance'
import { Attendance } from '@/types'
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
  handleAddAttendance?: (attendance: Attendance) => void
  onClose: () => void
  attendance: Attendance
  isReadOnly?: boolean
}

const ModalSingleAttendance = ({
  isOpen,
  onOpenChange,
  attendance: attendance,
  handleAddAttendance,
  isReadOnly = false,
}: Props) => {
  const [isLoading, setIsLoading] = useState(true)

  let list = useAsyncList({
    load() {
      const rows =
        attendance?.students
          ?.map(student => {
            return {
              key: student.student,
              student: student.student,
              attendance: student.present ? 'Presente' : 'Ausente',
            }
          })
          .toSorted((a, b) => (a.student > b.student ? 1 : -1)) ?? []
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
  }, [attendance])

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      size="xl"
      aria-label={
        isReadOnly
          ? `Asistencia de la fecha ${attendance.date}`
          : `Agregar asistencia de la fecha ${attendance.date}`
      }
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="text-center">
              Asistencia - {attendance.date}
            </ModalHeader>
            <Table
              isStriped
              sortDescriptor={list.sortDescriptor}
              onSortChange={list.sort}
              isHeaderSticky
              radius="none"
              aria-label={`Asistencia de la fecha ${attendance.date}`}
            >
              <TableHeader columns={columnsSingleAttendance}>
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
                    handleAddAttendance?.(attendance)
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
export default ModalSingleAttendance
