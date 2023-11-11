import { color } from '@/types'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import { MoreVertical } from 'lucide-react'

type Props = {
  color: color
  unitId: string
  handleAddAsistencia?: () => void
  handleEditUnit?: () => void
}

const UnitDropdown = ({
  color,
  unitId,
  handleAddAsistencia,
  handleEditUnit,
}: Props) => {
  return (
    <Dropdown placement="bottom">
      <DropdownTrigger>
        <Button variant="light" color={color} radius="full" isIconOnly>
          <MoreVertical className="w-8 h-8" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Unidad Actions" variant="flat">
        <DropdownItem key="add-asistencia">Agregar asistencia</DropdownItem>
        <DropdownItem key="edit-unidad">Editar unidad</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
export default UnitDropdown
