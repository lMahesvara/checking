import { getCourses } from '@/services/api'
import ListOfCourses from './ListOfCourses'

type Props = {
  userId: string
}

const ListOfCoursesSS = async ({ userId }: Props) => {
  const courses = await getCourses(userId)

  return <ListOfCourses courses={courses} />
}
export default ListOfCoursesSS
