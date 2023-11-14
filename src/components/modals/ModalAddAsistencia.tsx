import { Asistencia, IS_PRESENT } from '@/types'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react'
import { UploadCloud } from 'lucide-react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import ModalSingleAsistencia from './ModalSingleAsistencia'
import { useReadCSVFiles } from '@/hooks/useReadCSSFiles'

type Props = {
  isOpen: boolean
  onOpenChange: () => void
  unitId: string
  handleAddAsistencia: (asistencia: Asistencia) => void
  onClose: () => void
}

const ModalAddAsistencia = ({
  isOpen,
  onOpenChange,
  unitId,
  handleAddAsistencia,
  onClose,
}: Props) => {
  const [asistencia, setAsistencia] = useState({} as Asistencia)

  const {
    isOpen: isOpenTable,
    onOpen: onOpenTable,
    onOpenChange: onOpenChangeTable,
    onClose: onCloseTable,
  } = useDisclosure()

  const processCSVFile = async (csvContent: string) => {
    let asistencia = {} as Asistencia

    // Dividir el contenido del archivo en líneas
    const lines = csvContent.split('\n')
    const date = lines[0].split(' ').at(-1) as string
    asistencia.fecha = date
    asistencia.alumnos = []
    asistencia.unidad = unitId

    lines.forEach((line, index) => {
      // Ignorar las primeras 3 líneas, ya que la información de los alumnos empieza en la línea 4
      if (index <= 2) return

      // Dividir los datos por las tabulaciones
      const data = line.split('\t')

      // Acceder a los valores de cada columna
      const name = data[0]
      const isPresent = data[1]
      //const arrivalTime = data[2]

      asistencia.alumnos.push({
        alumno: name,
        presente: isPresent === IS_PRESENT,
      })
    })

    setAsistencia(asistencia)
    onOpenTable()
    onClose()
  }

  const {
    fileInputRef,
    isDragging,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    onFileInputChange,
    selectFiles,
    wrapperRef,
  } = useReadCSVFiles(processCSVFile)

  const onDragStyles = isDragging ? 'bg-zinc-800 ' : ''

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xl"
        hideCloseButton
        placement="center"
        classNames={{
          base:
            'border-2 border-dashed border-blue-500/70 hover:bg-zinc-800 hover:cursor-pointer ' +
            onDragStyles,
          body:
            `border-2 border-dashed border-blue-500/70 m-4 rounded-xl items-center justify-center gap-8 py-8 hover:bg-zinc-800 ` +
            onDragStyles,
        }}
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onDragStart={e => e.preventDefault()}
        ref={wrapperRef}
        onClick={selectFiles}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalBody>
                <UploadCloud className="w-24 h-24" />
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl text-gray-200 font-bold text-center">
                    Agregar asistencia
                  </h3>
                  {isDragging ? (
                    <span className="text-gray-400 text-center">
                      Suelta el archivo aquí
                    </span>
                  ) : (
                    <span className="text-gray-400 text-center">
                      Arrastra el archivo de asistencia o haz clic para subirlo.
                    </span>
                  )}
                </div>
                <Button
                  color="primary"
                  variant="flat"
                  radius="sm"
                  className="text-primary-700 bg-primary/50"
                  onPress={selectFiles}
                >
                  Seleccionar archivo
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={onFileInputChange}
                  accept=".csv"
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <ModalSingleAsistencia
        asistencia={asistencia}
        isOpen={isOpenTable}
        onClose={onCloseTable}
        onOpenChange={onOpenChangeTable}
        handleAddAsistencia={handleAddAsistencia}
      />
    </>
  )
}

export default ModalAddAsistencia
