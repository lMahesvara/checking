import { Course } from '@/types'

import { Settings } from 'lucide-react'
import NotResultsFound from './NoResultsFound'
import { Button } from '@nextui-org/react'
import ListOfUnits from '../ListOfUnits'

type Props = {
  course: Course
}

const CourseOverview = ({ course }: Props) => {
  return (
    <section className="py-2 sm:py-4 px-6 flex flex-col gap-8 sm:gap-10 h-full">
      <Button
        variant="light"
        radius="full"
        isIconOnly
        className="absolute top-[5.5rem] md:top-3 right-3"
      >
        <Settings className="w-7 h-7" />
      </Button>
      <Button color={course.color} radius="full" size="lg" className="w-fit">
        Agregar unidad
      </Button>

      {course.unidades ? (
        <ListOfUnits course={course} />
      ) : (
        <NotResultsFound
          title="No se encontraron unidades"
          message="Prueba creando una nueva unidad o sección."
          className="lg:pt-16"
        >
          <Button color="primary" variant="flat">
            Agregar unidad
          </Button>
        </NotResultsFound>
      )}
    </section>
  )
}
export default CourseOverview
