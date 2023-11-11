'use client'
import NotFound from '@/components/icons/NotFound'

type Props = {
  title?: string
  message?: string
  isHelpMessage?: boolean
  children?: React.ReactNode
  className?: string
}

const NotResultsFound = ({
  title,
  message,
  children,
  isHelpMessage = false,
  className,
}: Props) => {
  return (
    <section className={`w-full flex flex-col items-center gap-4 ${className}`}>
      <NotFound className="w-56" />
      <h2 className="text-4xl font-bold text-center">
        {title || 'No se encontraron resultados'}
      </h2>
      <p className="text-center text-default-500 w-full md:text-base">
        {message}
        {isHelpMessage && (
          <span className="text-primary/90">
            También puedes contactarnos para ayudarte.
          </span>
        )}
      </p>
      {children}
    </section>
  )
}

export default NotResultsFound
