import { Attendance, color } from '@/types'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from '@nextui-org/react'
import { MoreVertical } from 'lucide-react'
import ModalAddAttendance from './modals/ModalAddAttendance'

type Props = {
  color: color
  unitId: string
  handleAddAttendance: (attendance: Attendance) => void
  handleEditUnit?: () => void
}

const UnitDropdown = ({
  color,
  unitId,
  handleAddAttendance,
  handleEditUnit,
}: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  return (
    <>
      <ModalAddAttendance
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        unitId={unitId}
        handleAddAttendance={handleAddAttendance}
      />

      <Dropdown placement="bottom">
        <DropdownTrigger>
          <Button variant="light" color={color} radius="full" isIconOnly>
            <MoreVertical className="w-8 h-8" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Unidad Actions" variant="flat">
          <DropdownItem key="add-attendance" onPress={onOpen}>
            Agregar asistencia
          </DropdownItem>
          <DropdownItem key="edit-unit">Editar unidad</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}
export default UnitDropdown
