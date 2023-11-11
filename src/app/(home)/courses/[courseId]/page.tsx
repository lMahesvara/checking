import CourseTabs from '@/components/CourseTabs'
import { getCourse } from '@/services/api'

const CoursePage = async ({
  params: { courseId },
}: {
  params: { courseId: string }
}) => {
  const course = await getCourse(courseId)
  return <CourseTabs course={course} />
}
export default CoursePage
