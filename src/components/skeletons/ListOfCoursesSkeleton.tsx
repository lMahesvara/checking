import { Skeleton } from '@nextui-org/skeleton'

const ListOfCoursesSkeleton = () => {
  return (
    <>
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <article className="w-full flex items-center gap-3 py-3 px-6" key={i}>
            <div>
              <Skeleton className="flex rounded-full w-8 h-8" />
            </div>
            <div className="w-full">
              <Skeleton className="h-3 rounded-lg" />
            </div>
          </article>
        ))}
    </>
  )
}
export default ListOfCoursesSkeleton
