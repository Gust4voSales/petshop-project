import { Pet } from "@/@types/Pet";
import { PageTitle } from "@/components/dashboard/PageTitle";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Form/Inputs/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilSimple, Plus, X } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const petSchema = z.object({
  name: z
    .string()
    .min(3, "Tamanho mínimo do nome é de 3 caracteres")
    .max(60, "Tamanho máximo do nome é de 60 caracteres"),
  breed: z
    .string()
    .min(1, "Tamanho mínimo da raça é de 1 caracteres")
    .max(60, "Tamanho máximo da raça é de 60 caracteres"),
  age: z.coerce.number().int().min(0, "Idade mínima é 0"),
});

export type PetFormData = z.infer<typeof petSchema>;

type ModalElement = {
  showModal: () => void;
  close: () => void;
} & HTMLElement;

type Props = {
  pet?: Pet;
  onSubmit: (pet: PetFormData) => void;
};
export function PetForm({ pet, onSubmit }: Props) {
  const isPetUpdate = pet !== undefined;
  const modal = document.getElementById(`pet_form_modal_${pet ? pet.id : "create"}`) as ModalElement | null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<PetFormData>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      name: pet?.name ?? "",
      breed: pet?.breed ?? "",
      age: pet?.age ?? 0,
    },
  });

  function handleOpenModal() {
    resetForm();
    modal?.showModal();
  }

  function handleSubmitForm(data: PetFormData) {
    onSubmit(data);
    modal?.close();
  }

  return (
    <div>
      {isPetUpdate ? (
        <Button circle tooltipText="Editar" onClick={handleOpenModal}>
          <PencilSimple className="w-6 h-6" />
        </Button>
      ) : (
        <Button tooltipText="Adicionar Pet" type="button" outline circle onClick={handleOpenModal}>
          <Plus />
        </Button>
      )}

      <dialog id={`pet_form_modal_${pet ? pet.id : "create"}`} className="modal">
        <div className="modal-box">
          <div className="flex justify-between items-center">
            <PageTitle title="Adicionar Pet" />
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <Button bg="ghost" circle>
                <X className="w-5 h-5" />
              </Button>
            </form>
          </div>

          <form className="mt-4" onSubmit={handleSubmit(handleSubmitForm)}>
            <fieldset>
              <Input label="Nome do pet" id={`name`} errorMessage={errors.name?.message} {...register(`name`)} />
            </fieldset>
            <fieldset>
              <Input label="Raça do pet" id={`breed`} errorMessage={errors.breed?.message} {...register(`breed`)} />
            </fieldset>
            <fieldset className="w-32">
              <Input
                type="number"
                label="Idade do pet"
                id={`age`}
                errorMessage={errors.age?.message}
                {...register(`age`)}
              />
            </fieldset>

            <div className="ml-auto w-fit">
              <Button bg="submit" type="submit">
                {isPetUpdate ? "Editar" : "Criar"}
              </Button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
