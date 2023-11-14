import { Asistencia, color } from '@/types'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from '@nextui-org/react'
import { MoreVertical } from 'lucide-react'
import ModalAddAsistencia from './modals/ModalAddAsistencia'

type Props = {
  color: color
  unitId: string
  handleAddAsistencia: (asistencia: Asistencia) => void
  handleEditUnidad?: () => void
}

const UnitDropdown = ({
  color,
  unitId,
  handleAddAsistencia,
  handleEditUnidad,
}: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  return (
    <>
      <ModalAddAsistencia
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        unitId={unitId}
        handleAddAsistencia={handleAddAsistencia}
      />

      <Dropdown placement="bottom">
        <DropdownTrigger>
          <Button variant="light" color={color} radius="full" isIconOnly>
            <MoreVertical className="w-8 h-8" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Unidad Actions" variant="flat">
          <DropdownItem key="add-asistencia" onPress={onOpen}>
            Agregar asistencia
          </DropdownItem>
          <DropdownItem key="edit-unidad">Editar unidad</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}
export default UnitDropdown
