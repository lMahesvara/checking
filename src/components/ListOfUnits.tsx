import { Course } from '@/types'
import UnitDropdown from './UnitDropdown'

type Props = {
  course: Course
}

const ListOfUnits = ({ course }: Props) => {
  return course?.unidades?.map(unidad => (
    <section key={unidad._id} className="">
      <div
        className={`flex items-center justify-between border-b-2 border-${course.color} py-2 pl-6 pr-2`}
      >
        <h2 className="font-medium text-3xl line-clamp-1 ">{unidad.name}</h2>
        <UnitDropdown unitId={unidad._id} color={course.color} />
      </div>
      <ul>
        {course?.asistencias?.map(
          asistencia =>
            asistencia?.unidad === unidad._id && (
              <li className="" key={asistencia._id}>
                <button className="px-4 py-2 w-full text-left hover:bg-zinc-800 text-gray-200">
                  Asistencia - {asistencia.fecha}
                </button>
              </li>
            )
        )}
      </ul>
    </section>
  ))
}
export default ListOfUnits
