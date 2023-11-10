import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/dropdown'

import { Avatar } from '@nextui-org/avatar'
import { UserCog2, LogOut } from 'lucide-react'
import { User } from '@nextui-org/user'
import { signOut, useSession } from 'next-auth/react'
import UserSkeleton from './skeletons/UserSkeleton'
import { getFirstLetter } from '@/lib/utils'
import { memo } from 'react'

const UserDropdown = memo(function UserDropdown() {
  const { data: session } = useSession()

  if (!session) return <UserSkeleton />
  const { user } = session

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          name={getFirstLetter(user.username)}
          as="button"
          color="primary"
          size="sm"
          isBordered
          className="transition-transform text-lg font-semibold"
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Profile Actions"
        variant="flat"
        disabledKeys={['info']}
      >
        <DropdownItem isReadOnly key="info" className="h-14 gap-2 opacity-100">
          <User
            name={user.username}
            description={user.email}
            classNames={{
              name: 'text-default-600',
              description:
                'text-default-500 overflow-ellipsis whitespace-nowrap overflow-hidden max-w-[168px]',
            }}
            avatarProps={{
              name: getFirstLetter(user.username),
              className: 'hidden',
            }}
          />
        </DropdownItem>
        <DropdownItem key="profile" startContent={<UserCog2 />} href="/profile">
          Editar perfil
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          className="text-danger"
          startContent={<LogOut />}
          onClick={() => {
            signOut()
          }}
        >
          Cerrar sesión
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
})

export default UserDropdown
