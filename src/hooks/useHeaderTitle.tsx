import { getCourse } from '@/services/api'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export const useHeaderTitle = () => {
  const [title, setTitle] = useState('')
  const path = usePathname()

  useEffect(() => {
    const handlePath = async () => {
      if (path?.startsWith('/courses/')) {
        const courseId = path.split('/')[2]
        getCourse(courseId).then(course => {
          setTitle(course.name)
        })
      }
    }

    handlePath()

    return () => {
      setTitle('')
    }
  }, [path])

  return { title }
}
