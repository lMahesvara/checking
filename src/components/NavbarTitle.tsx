import { useHeaderTitle } from '@/hooks/useHeaderTitle'
import { NavbarContent, NavbarItem } from '@nextui-org/react'

const NavbarTitle = () => {
  const { title } = useHeaderTitle()

  return (
    <NavbarContent justify="center" className="hidden sm:flex">
      <NavbarItem>
        <p className="font-medium text-gray-200 ">{title}</p>
      </NavbarItem>
    </NavbarContent>
  )
}
export default NavbarTitle
