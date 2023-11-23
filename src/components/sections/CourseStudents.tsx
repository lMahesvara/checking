import { Course } from '@/types'
import {
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
import { useState } from 'react'

type Props = {
  course: Course
}

const columnsStudents = [{ key: 'student', label: 'Nombre del alumno' }]

const CourseStudents = ({ course }: Props) => {
  const [isLoading, setIsLoading] = useState(true)

  let list = useAsyncList({
    load() {
      const rows =
        course.students
          ?.map(student => {
            return {
              key: student,
              student: student,
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

  return (
    <Table
      isStriped
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
      isHeaderSticky
      radius="none"
      aria-label={` Tabla de alumnos del curso ${course.name}`}
      classNames={{
        td: 'text-lg text-white/80',
        th: 'text-base',
      }}
    >
      <TableHeader columns={columnsStudents}>
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
            {columnKey => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
export default CourseStudents
