import { Attendance, IS_PRESENT } from '@/types'
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
import ModalSingleAttendance from './ModalSingleAttendance'
import { useReadCSVFiles } from '@/hooks/useReadCSSFiles'

type Props = {
  isOpen: boolean
  onOpenChange: () => void
  unitId: string
  handleAddAttendance: (attendance: Attendance) => void
  onClose: () => void
}

const ModalAddAttendance = ({
  isOpen,
  onOpenChange,
  unitId,
  handleAddAttendance,
  onClose,
}: Props) => {
  const [attendance, setAttendance] = useState({} as Attendance)

  const {
    isOpen: isOpenTable,
    onOpen: onOpenTable,
    onOpenChange: onOpenChangeTable,
    onClose: onCloseTable,
  } = useDisclosure()

  const processCSVFile = async (csvContent: string) => {
    let attendance = {} as Attendance

    // Dividir el contenido del archivo en líneas
    const lines = csvContent.split('\n')
    const date = lines[0].split(' ').at(-1) as string
    attendance.date = date
    attendance.students = []
    attendance.unit = unitId

    lines.forEach((line, index) => {
      // Ignorar las primeras 3 líneas, ya que la información de los alumnos empieza en la línea 4
      if (index <= 2) return

      // Dividir los datos por las tabulaciones
      const data = line.split('\t')

      // Acceder a los valores de cada columna
      const name = data[0]
      const isPresent = data[1]
      //const arrivalTime = data[2]

      attendance.students.push({
        student: name,
        present: isPresent === IS_PRESENT,
      })
    })

    setAttendance(attendance)
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
      <ModalSingleAttendance
        attendance={attendance}
        isOpen={isOpenTable}
        onClose={onCloseTable}
        onOpenChange={onOpenChangeTable}
        handleAddAttendance={handleAddAttendance}
      />
    </>
  )
}

export default ModalAddAttendance
