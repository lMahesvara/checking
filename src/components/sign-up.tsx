"use client"
import { Input } from '@nextui-org/react'
import { Button } from '@nextui-org/button'
import { validateEmail, validatePassword } from '@/lib/utils'
import { toast } from 'sonner'
import PasswordInput from './password-input'
import { useRouter } from 'next/navigation'

export default function SignUp() {

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const { username, email, password } = Object.fromEntries(formData)

    if (!validateEmail(email as string)) {
      return toast.error('El correo electrónico no es válido')
    }

    if (!validatePassword(password as string)) {
      return toast.error(
        'La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula y un número'
      )
    }

    try{
      //TODO realizar peticion a back
      toast.success("Se registró el Usuario correctamente");
      router.push("/auth/login")
    } catch(error){
      console.log(error);
    }

  }


  return (
    <section className="w-[400px] rounded-lg shadow-lg bg-zinc-800 p-6 space-y-6">

        <h1 className="text-3xl font-bold text-center text-white">
            Registrarse
        </h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <Input
            isClearable
            label="Nombre de Usuario"
            variant="bordered"
            name="username"
            isRequired
            placeholder="Ingrese su nombre de usuario"
            defaultValue=""
            onClear={() => console.log('input cleared')}
            className="w-ful"
          />

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
            Registrarse
          </Button>
        </form>

        <p className="text-white text-sm text-center">
          ¿Ya tienes una cuenta?{' '}
          <a href="/auth/login" className="hover:underline text-primary-500">
            Inicia Sesión
          </a>
        </p>

    </section>
  )
}