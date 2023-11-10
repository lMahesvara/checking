'use client'
import { validateEmail, validatePassword } from '@/lib/utils'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import PasswordInput from './password-input'


export default function Login() {
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const { email, password } = Object.fromEntries(formData)

    if (!validateEmail(email as string)) {
      return toast.error('El correo electrónico no es válido')
    }

    if (!validatePassword(password as string)) {
      return toast.error(
        'La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula y un número'
      )
    }

    try {
      const responseNextAuth = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (responseNextAuth?.error) {
        toast.error(responseNextAuth.error)
        return
      }

      router.push('/home')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="w-[400px] rounded-lg shadow-lg bg-zinc-800 p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-white">
        Iniciar sesión
      </h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <Input
          isClearable
          type="email"
          label="Correo electrónico"
          variant="bordered"
          name="email"
          isRequired
          placeholder="Ingrese su correo electrónico"
          defaultValue=""
          onClear={() => console.log('input cleared')}
          className="w-ful"
        />
        <PasswordInput />
        <Button className="w-full" color="primary" type="submit">
          Iniciar sesión
        </Button>
      </form>
      <p className="text-white text-sm text-center">
        ¿Nuevo en Checking?{' '}
        <a href="/auth/signup" className="hover:underline text-primary-500">
          Crear una cuenta
        </a>
      </p>
    </section>
  )
}
