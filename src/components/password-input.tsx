"use client"
import { useState } from 'react'
import { Input } from '@nextui-org/react'
import { EyeSlashFilledIcon } from './icons/EyeSlashFilled'
import { EyeFilledIcon } from './icons/EyeFilledIcon'

export default function PasswordInput() {

  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <Input
        label="Contraseña"
        isRequired
        variant="bordered"
        name="password"
        placeholder="Ingrese su contraseña"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? 'text' : 'password'}
        className="w-ful"
      />
  )
}