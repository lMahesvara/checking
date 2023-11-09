import { getFirstLetter, pickRandomColor } from '@/lib/utils'
import { Course } from '@/types'
import { Avatar } from '@nextui-org/react'
import Link from 'next/link'

type Props = {
  courses: Course[]
}

const ListOfCourses = ({ courses }: Props) => {
  return (
    <section>
      {courses?.map(course => (
        <Link
          key={course._id}
          href={`/courses/${course._id}`}
          className="flex gap-4 items-center py-3 px-6 hover:bg-zinc-800 text-gray-200 text-sm "
        >
          <Avatar
            name={getFirstLetter(course.name)}
            color={course.color || pickRandomColor()}
            classNames={{
              base: 'max-w-[32px] max-h-[32px] min-w-[32px] min-h-[32px] ',
              name: 'text-base font-semibold',
            }}
          />
          <span className=" line-clamp-1">{course.name}</span>
        </Link>
      ))}
    </section>
  )
}
export default ListOfCourses
