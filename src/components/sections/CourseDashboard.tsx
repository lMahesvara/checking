import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Selection,
  SortDescriptor,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from '@nextui-org/react'
import React, { useState } from 'react'
import { AttendanceTableEntry, Course, IS_ABSENT, IS_PRESENT } from '@/types'
import TableSkeleton from '../skeletons/TableAttendancesSkeleton'
import { capitalize, getShortDate } from '@/lib/utils'
import { ChevronDownIcon, SearchIcon } from 'lucide-react'

type Props = {
  course: Course
}

const CourseDashboard = ({ course }: Props) => {
  const [filterValue, setFilterValue] = React.useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [visibleUnits, setVisibleUnits] = useState<Selection>(
    new Set(course.units.map(unit => unit._id))
  )
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'student',
    direction: 'ascending',
  })

  const visibleColumns = React.useMemo(() => {
    const rows = Array.from(
      new Set(
        course.attendances.flatMap(attendance => {
          return {
            key: attendance.date,
            value: getShortDate(attendance.date),
            unitId: attendance.unit,
          }
        })
      )
    ).sort()
    return [{ key: 'student', value: 'Estudiante', unitId: 'student' }, ...rows]
  }, [course.attendances])

  const headerColumns = React.useMemo(() => {
    if (visibleUnits === 'all') return visibleColumns

    return visibleColumns.filter(
      row => visibleUnits.has(row.unitId) || row.key === 'student'
    )
  }, [visibleUnits, visibleColumns])

  const filteredItems = React.useMemo(() => {
    const attendanceTable: AttendanceTableEntry[] = course.attendances.reduce(
      (table: AttendanceTableEntry[], attendance) => {
        attendance.students.forEach(studentAttendance => {
          const existingEntry = table.find(
            entry => entry.student === studentAttendance.student
          )

          if (existingEntry) {
            existingEntry[attendance.date] = studentAttendance.present
              ? IS_PRESENT
              : IS_ABSENT
          } else {
            const newEntry: AttendanceTableEntry = {
              key: studentAttendance.student + attendance.date,
              student: studentAttendance.student,
              [attendance.date]: studentAttendance.present
                ? IS_PRESENT
                : IS_ABSENT,
            }
            table.push(newEntry)
          }
        })
        return table
      },
      []
    )
    const filteredTable = attendanceTable.filter(entry => {
      return entry.student.toLowerCase().includes(filterValue.toLowerCase())
    })
    filteredTable.sort((a, b) => a.student.localeCompare(b.student))

    setIsLoading(false)
    return filteredTable
  }, [course, filterValue])

  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      let first = a[sortDescriptor.column as keyof AttendanceTableEntry]
      let second = b[sortDescriptor.column as keyof AttendanceTableEntry]
      const cmp = (Number(first) || first) > (Number(second) || second) ? 1 : -1

      return sortDescriptor.direction === 'descending' ? -cmp : cmp
    })
  }, [filteredItems, sortDescriptor])

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value)
    } else {
      setFilterValue('')
    }
  }, [])

  const onClear = React.useCallback(() => {
    setFilterValue('')
  }, [])

  if (isLoading) return <TableSkeleton />

  if (!course.attendances.length) return <p>No hay asistencias registradas</p>

  return (
    <>
      <section className="flex flex-col gap-4 md:flex-row md:justify-between p-4">
        <Input
          isClearable
          className="w-full md:max-w-[44%]"
          placeholder="Buscar estudiante"
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        <Dropdown>
          <DropdownTrigger className="flex">
            <Button
              endContent={<ChevronDownIcon className="text-small" />}
              variant="flat"
            >
              Unidades
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Attendance units"
            closeOnSelect={false}
            selectedKeys={visibleUnits}
            selectionMode="multiple"
            onSelectionChange={setVisibleUnits}
          >
            {course.units.map(unit => (
              <DropdownItem key={unit._id} className="capitalize">
                {capitalize(unit.name)}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </section>
      <Table
        isStriped
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        isHeaderSticky
        radius="none"
        aria-label={`Asistencia del curso ${course.name}`}
        className="overflow-auto"
      >
        <TableHeader columns={headerColumns}>
          {column => (
            <TableColumn
              key={column.key}
              allowsSorting={column.key === 'student'}
              className={`${column.key === 'student' ? '' : 'text-center'}`}
            >
              {column.value}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={sortedItems}
          isLoading={isLoading}
          loadingContent={<Spinner label="Cargando..." />}
          emptyContent="No hay asistencias registradas"
        >
          {item => (
            <TableRow key={item.key}>
              {columnKey => (
                <TableCell
                  className={`${
                    columnKey === 'student' ? 'font-semibold' : 'text-center'
                  }`}
                >
                  {getKeyValue(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
export default CourseDashboard
