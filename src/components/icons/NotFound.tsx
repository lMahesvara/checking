import React from 'react'

const NotFound = ({ className }: { className?: string }) => {
  return <img src='/not-found.svg' alt='Not found' className={`${className}`} />
}

export default NotFound
