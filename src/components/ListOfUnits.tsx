import { Asistencia, Course } from '@/types'
import UnitDropdown from './UnitDropdown'
import { postAsistencia } from '@/services/api'
import { toast } from 'sonner'
import ModalSingleAsistencia from './modals/ModalSingleAsistencia'
import { useDisclosure } from '@nextui-org/react'
import { useState } from 'react'

type Props = {
  course: Course
}

const ListOfUnits = ({ course }: Props) => {
  const [asistencia, setAsistencia] = useState({} as Asistencia)
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

  const handleAddAsistencia = async (asistencia: Asistencia) => {
    try {
      await postAsistencia({ courseId: course._id, asistencia })
      toast.success('Asistencia agregada')
      //TODO: Mutate the key to revalidate the data if it's needed
    } catch (error) {
      toast.error('No se pudo agregar la asistencia')
    }
  }

  return (
    <>
      <ModalSingleAsistencia
        asistencia={asistencia}
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        isReadOnly
      />
      {course?.unidades?.map(unidad => (
        <section key={unidad._id} className="">
          <div
            className={`flex items-center justify-between border-b-2 border-${course.color} py-2 pl-6 pr-2`}
          >
            <h2 className="font-medium text-3xl line-clamp-1 ">
              {unidad.name}
            </h2>
            <UnitDropdown
              handleAddAsistencia={handleAddAsistencia}
              unitId={unidad._id}
              color={course.color}
            />
          </div>
          <ul>
            {course?.asistencias?.map(
              asistencia =>
                asistencia?.unidad === unidad._id && (
                  <li className="" key={asistencia._id}>
                    <button
                      className="px-4 py-2 w-full text-left hover:bg-zinc-800 text-gray-200"
                      onClick={() => {
                        setAsistencia(asistencia)
                        onOpen()
                      }}
                    >
                      Asistencia - {asistencia.fecha}
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
