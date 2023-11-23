import React from 'react'
import { Skeleton } from '@nextui-org/react'

const TableSkeleton = () => {
  return (
    <div className="border border-zinc-800 rounded-lg overflow-hidden p-4 ">
      {/* Encabezado de la tabla */}
      <div className="flex p-2 bg-zinc-800 rounded-t-lg">
        <span className="grow-[2] h-5 mr-2 bg-default-50" />
        <span className="flex-1 h-5 mr-2 bg-default-50" />
        <span className="flex-1 h-5 mr-2 bg-default-50" />
        <span className="flex-1 h-5 mr-2 bg-default-50" />
      </div>

      <div className="flex p-2 border-b border-zinc-800 bg-default-100/40">
        <Skeleton className="grow-[2] h-5 mr-2" />
        <Skeleton className="flex-1 h-5 mr-2" />
        <Skeleton className="flex-1 h-5 mr-2" />
        <Skeleton className="flex-1 h-5 mr-2" />
      </div>

      <div className="flex p-2 border-b border-zinc-800 bg-default-100/80 ">
        <Skeleton className="grow-[2] h-5 mr-2" />
        <Skeleton className="flex-1 h-5 mr-2" />
        <Skeleton className="flex-1 h-5 mr-2" />
        <Skeleton className="flex-1 h-5 mr-2" />
      </div>
      <div className="flex p-2 border-b border-zinc-800 bg-default-100/40">
        <Skeleton className="grow-[2] h-5 mr-2" />
        <Skeleton className="flex-1 h-5 mr-2" />
        <Skeleton className="flex-1 h-5 mr-2" />
        <Skeleton className="flex-1 h-5 mr-2" />
      </div>

      <div className="flex p-2 border-b border-zinc-800 bg-default-100/80 ">
        <Skeleton className="grow-[2] h-5 mr-2" />
        <Skeleton className="flex-1 h-5 mr-2" />
        <Skeleton className="flex-1 h-5 mr-2" />
        <Skeleton className="flex-1 h-5 mr-2" />
      </div>
      <div className="flex p-2 border-b border-zinc-800 bg-default-100/40">
        <Skeleton className="grow-[2] h-5 mr-2" />
        <Skeleton className="flex-1 h-5 mr-2" />
        <Skeleton className="flex-1 h-5 mr-2" />
        <Skeleton className="flex-1 h-5 mr-2" />
      </div>

      <div className="flex p-2 border-b border-zinc-800 bg-default-100/80 rounded-b-lg">
        <Skeleton className="grow-[2] h-5 mr-2" />
        <Skeleton className="flex-1 h-5 mr-2" />
        <Skeleton className="flex-1 h-5 mr-2" />
        <Skeleton className="flex-1 h-5 mr-2" />
      </div>
    </div>
  )
}

export default TableSkeleton
