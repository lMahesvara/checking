import { Attendance, Course } from '@/types'
import UnitDropdown from './UnitDropdown'
import { postAttendance } from '@/services/api'
import { toast } from 'sonner'
import ModalSingleAttendance from './modals/ModalSingleAttendance'
import { useDisclosure } from '@nextui-org/react'
import { useState } from 'react'

type Props = {
  course: Course
}

const ListOfUnits = ({ course }: Props) => {
  const [attendance, setAttendance] = useState({} as Attendance)
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

  const handleAddAttendance = async (attendance: Attendance) => {
    try {
      await postAttendance({ courseId: course._id, attendance })
      toast.success('Asistencia agregada')
      //TODO: Mutate the key to revalidate the data if it's needed
    } catch (error) {
      toast.error('No se pudo agregar la asistencia')
    }
  }

  return (
    <>
      <ModalSingleAttendance
        attendance={attendance}
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        isReadOnly
      />
      {course?.units?.map(unit => (
        <section key={unit._id} className="">
          <div
            className={`flex items-center justify-between border-b-2 border-${course.color} py-2 pl-6 pr-2`}
          >
            <h2 className="font-medium text-3xl line-clamp-1 ">{unit.name}</h2>
            <UnitDropdown
              handleAddAttendance={handleAddAttendance}
              unitId={unit._id}
              color={course.color}
            />
          </div>
          <ul>
            {course?.attendances?.map(
              attendance =>
                attendance?.unit === unit._id && (
                  <li className="" key={attendance._id}>
                    <button
                      className="px-4 py-2 w-full text-left hover:bg-zinc-800 text-gray-200"
                      onClick={() => {
                        setAttendance(attendance)
                        onOpen()
                      }}
                    >
                      Asistencia - {attendance.date}
                    </button>
                  </li>
                )
            )}
          </ul>
        </section>
      ))}
    </>
  )
}
export default ListOfUnits
