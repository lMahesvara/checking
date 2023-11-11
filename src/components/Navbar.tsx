'use client'
import React from 'react'
import {
  Navbar as NavbarNUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  Tooltip,
} from '@nextui-org/react'

import { Button } from '@nextui-org/button'
import { PlusSquare } from 'lucide-react'
import AsideMenuMobile from './AsideMenuMobile'
import UserDropdown from './UserDropdown'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <NavbarNUI
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        base: 'bg-zinc-900 border-b-2 border-gray-500',
      }}
      maxWidth="xl"
      isBlurred={false}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">Checking</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end" className="">
        <NavbarItem className="flex items-center justify-center">
          <Tooltip
            content="Crear curso"
            delay={1000}
            color="secondary"
            placement="bottom"
          >
            <Button variant="light" size="lg" radius="full" isIconOnly>
              <PlusSquare className="w-8 h-8" />
            </Button>
          </Tooltip>
        </NavbarItem>
        <NavbarItem>
          <UserDropdown />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="bg-zinc-900">
        <AsideMenuMobile />
      </NavbarMenu>
    </NavbarNUI>
  )
}
