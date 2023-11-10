import { Home } from 'lucide-react'
import Link from 'next/link'
import ListOfCoursesSS from './ListOfCoursesSS'
import { Suspense } from 'react'
import ListOfCoursesSkeleton from './skeletons/ListOfCoursesSkeleton'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

type Props = {}

const AsideMenu = async ({}: Props) => {
  const session = await getServerSession(authOptions)

  if (!session) return null

  const { user } = session

  return (
    <aside
      className={`space-y-2 max-w-xs border-x-2 border-gray-500 flex-1 hidden sm:block `}
    >
      <section className="flex flex-col gap-3 border-b-2 border-gray-500 py-2">
        <Link
          href="/home"
          className="flex gap-4 items-center py-3 px-6 hover:bg-zinc-800 text-gray-200 text-sm"
        >
          <Home /> Inicio
        </Link>
      </section>
      <Suspense fallback={<ListOfCoursesSkeleton />}>
        <ListOfCoursesSS userId={user._id} />
      </Suspense>
    </aside>
  )
}
export default AsideMenu
