import { Home } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import ListOfCoursesSkeleton from './skeletons/ListOfCoursesSkeleton'
import ListOfCoursesCS from './ListOfCoursesCS'
import { useSession } from 'next-auth/react'

const AsideMenuMobile = () => {
  const { data: session } = useSession()

  if (!session) return null

  const { user } = session

  return (
    <aside className={`space-y-2 w-full h-full`}>
      <section className="flex flex-col gap-3 border-b-2 border-gray-500 py-2">
        <Link
          href="/home"
          className="flex gap-4 items-center py-3 px-6 hover:bg-zinc-800 text-gray-200 text-sm"
        >
          <Home /> Inicio
        </Link>
      </section>
      <Suspense fallback={<ListOfCoursesSkeleton />}>
        <ListOfCoursesCS userId={user?._id} />
      </Suspense>
    </aside>
  )
}
export default AsideMenuMobile
