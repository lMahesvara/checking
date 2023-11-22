"use client"
import { Input, Button } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { validateEmail } from '@/lib/utils'
import { toast } from 'sonner'

function UpdateProfile() {
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const { email, username } = Object.fromEntries(formData)

    if (!validateEmail(email as string)) {
      return toast.error('El correo electrónico no es válido')
    }

    try{
      //TODO realizar peticion a back
      toast.success("Se realizaron los cambios correctamente");
    } catch(error){
      console.log(error);
    }

  }

  return (
    <div className="w-5/6 mx-auto">
        <h1 className="text-3xl text-white font-bold my-5">Editar Perfil</h1>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>

          <Input
            isClearable
            label="Nombre de Usuario"
            variant="bordered"
            name="username"
            value={session?.user.username}
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
            value={session?.user.email}
            name="email"
            isRequired
            placeholder="Ingrese su correo electrónico"
            defaultValue=""
            onClear={() => console.log('input cleared')}
            className="w-ful"
          />

        <Button className="w-full" color="primary" type="submit">
          Realizar cambios
        </Button>

        </form>
    </div>
  )
}

export default UpdateProfile