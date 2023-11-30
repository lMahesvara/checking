"use client"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { pickRandomColor } from "@/lib/utils";
import { toast } from "sonner";
import { Course } from '@/types'


type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  type: "create" | "edit";
  course?: Course; 
};

function CreateCourseModal({isOpen, onOpenChange, type, course}: Props) {

    const session = useSession();

    const user = session.data?.user;

    async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        const formData = new FormData(e.currentTarget)
        const { name } = Object.fromEntries(formData)
        
        const curso = {
            name,
            maestro: user?._id,
            color: pickRandomColor()
        }
        try{

            //TODO Realizar petición a back para crear curso
            toast.success("Curso Registrado!")
        } catch(error){
            console.log(error);
        }

    }

    return (
      <>
        <Modal 
          isOpen={isOpen} 
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <form onSubmit={handleOnSubmit}>
                    <ModalHeader className="flex flex-col gap-1">{type==="edit" ? "Editar Curso": "Crear Curso" }</ModalHeader>
                    <ModalBody>
                    <Input
                        autoFocus
                        label="Nombre"
                        placeholder="Introduzca el nombre del curso"
                        name="name"
                        variant="bordered"
                        value={type==="edit" ? course?.name: "" }
                    />
                    </ModalBody>
                    <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                        Salir
                    </Button>
                    <Button type="submit" color="primary" onPress={onClose}>
                      {type==="edit" ? "Realizar Cambios": "Crear" }
                    </Button>
                    </ModalFooter>
                </form>
                
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
}

export default CreateCourseModal;