'use client'
import { Course } from '@/types'
import { Tab, Tabs } from '@nextui-org/tabs'
import CourseOverview from './sections/CourseOverview'

type Props = {
  course: Course
}

const CourseTabs = ({ course }: Props) => {
  return (
    <Tabs
      variant="solid"
      color={course.color}
      classNames={{
        base: 'w-full px-6 pt-3 border-b-2 border-gray-500 pb-3',
      }}
    >
      <Tab key="overview" title="Vista general">
        <CourseOverview course={course} />
      </Tab>
      <Tab key="dashboard" title="Dashboard" />
      <Tab key="students" title="Alumnos" />
    </Tabs>
  )
}
export default CourseTabs
