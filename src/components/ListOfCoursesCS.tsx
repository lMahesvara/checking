import { getCourses } from '@/services/api'
import useSWR from 'swr'
import ListOfCourses from './ListOfCourses'

type Props = {
  userId: string
}
const ListOfCoursesCS = ({ userId }: Props) => {
  const { data: course } = useSWR(
    `/api/courses/${userId}`,
    () => getCourses(userId),
    { suspense: true }
  )
  return <ListOfCourses courses={course} />
}
export default ListOfCoursesCS
