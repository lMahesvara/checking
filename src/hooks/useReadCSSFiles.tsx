import { useRef, useState } from 'react'
import { toast } from 'sonner'

export const useReadCSVFiles = (callback: (csvContent: string) => void) => {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
    e.dataTransfer.dropEffect = 'copy'
  }

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    if (wrapperRef.current === e.target) {
      setIsDragging(false)
    }
  }

  const validateCSVFile = (files: FileList) => {
    if (!files) return toast.error('No se pudo leer el archivo')

    if (files.length !== 1) return toast.error('Solo puedes subir un archivo')

    const selectedFile = files[0]

    if (!selectedFile.name.endsWith('.csv'))
      return toast.error('El archivo debe ser de tipo CSV')

    const reader = new FileReader()
    reader.onload = event => {
      const csvContent = event?.target?.result as string
      callback(csvContent)
    }
    reader.readAsText(selectedFile)
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    validateCSVFile(files)
  }

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    validateCSVFile(files as FileList)
  }

  const selectFiles = () => {
    if (fileInputRef.current === null) {
      return toast.error('No se pudo seleccionar el archivo')
    }
    fileInputRef.current.click()
  }

  return {
    isDragging,
    onDragOver,
    onDragEnter,
    onDragLeave,
    onDrop,
    onFileInputChange,
    selectFiles,
    fileInputRef,
    wrapperRef,
  }
}
