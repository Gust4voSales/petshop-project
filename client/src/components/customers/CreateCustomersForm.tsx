import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Form/Inputs/Input";
import { ScrollArea } from "@components/ui/ScrollArea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "phosphor-react";
import { useFieldArray, useForm } from "react-hook-form";
import { Customer } from "src/@types/Customer";
import { z } from "zod";

const customerSchema = z.object({
  name: z
    .string()
    .min(3, "Tamanho mínimo do nome é de 3 caracteres")
    .max(60, "Tamanho máximo do nome é de 60 caracteres"),
  phone: z
    .string()
    .trim()
    .min(8, "Tamanho mínimo do celular é de 8 caracteres")
    .max(18, "Tamanho máximo do celular é de 18 caracteres"),
  pets: z.array(
    z.object({
      name: z
        .string()
        .min(3, "Tamanho mínimo do nome é de 3 caracteres")
        .max(60, "Tamanho máximo do nome é de 60 caracteres"),
      breed: z
        .string()
        .min(1, "Tamanho mínimo da raça é de 1 caracteres")
        .max(60, "Tamanho máximo da raça é de 60 caracteres"),
      age: z.coerce.number().int().min(0, "Idade mínima é 0"),
    })
  ),
});

export type CreateCustomerFormData = z.infer<typeof customerSchema>;

interface Props {
  customer?: Customer;
  onSubmit: (d: CreateCustomerFormData) => Promise<void>;
  isLoading: boolean;
}
export function CreateCustomersForm(props: Props) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: props.customer?.name ?? "",
      phone: props.customer?.phone ?? "",
      pets: [],
    },
  });
  const fieldArrayForm = useFieldArray({
    name: "pets",
    control,
  });

  function addPetForm() {
    fieldArrayForm.append({
      name: "",
      breed: "",
      age: 0,
    });
  }

  const getSubmitButtonText = () => (props.customer ? "Editar" : "Criar");

  return (
    <form onSubmit={handleSubmit(props.onSubmit)} className="flex flex-col w-full mt-4 gap-4 flex-wrap">
      <div className="flex gap-2 flex-wrap">
        <fieldset>
          <Input label="Nome" id="name" errorMessage={errors.name?.message} {...register("name")} />
        </fieldset>
        <fieldset>
          <Input label="Celular" id="phone" type="tel" errorMessage={errors.phone?.message} {...register("phone")} />
        </fieldset>
      </div>

      <div className="prose flex items-center gap-2">
        <h3 className="my-0">Pets</h3>
      </div>
      <ScrollArea>
        <div className="flex flex-wrap gap-2 items-center max-h-96 ">
          {fieldArrayForm.fields.map((field, index) => {
            return (
              <div
                key={field.id}
                className={`flex items-center w-[38rem] gap-2 border-2 p-2 rounded-[var(--rounded-box)] relative`}
              >
                <fieldset>
                  <Input
                    label="Nome do pet"
                    id={`pets.${index}.name`}
                    errorMessage={errors.pets?.[index]?.name?.message}
                    {...register(`pets.${index}.name` as const)}
                  />
                </fieldset>
                <fieldset>
                  <Input
                    label="Raça do pet"
                    id={`pets.${index}.breed`}
                    errorMessage={errors.pets?.[index]?.breed?.message}
                    {...register(`pets.${index}.breed` as const)}
                  />
                </fieldset>
                <fieldset className="w-32">
                  <Input
                    type="number"
                    label="Idade do pet"
                    id={`pets.${index}.age`}
                    errorMessage={errors.pets?.[index]?.age?.message}
                    {...register(`pets.${index}.age` as const)}
                  />
                </fieldset>

                <button
                  className="tooltip tooltip-left absolute right-2 top-2 bg-error text-primary-content rounded-[--var(rounded-btn)]"
                  data-tip="Remover Pet"
                  type="button"
                  onClick={() => fieldArrayForm.remove(index)}
                >
                  <X />
                </button>
              </div>
            );
          })}
          <div>
            <Button onClick={addPetForm} tooltipText="Adicionar Pet" type="button" outline circle>
              <Plus />
            </Button>
          </div>
        </div>
      </ScrollArea>

      <div>
        <Button type="submit" bg="submit" isLoading={props.isLoading}>
          {getSubmitButtonText()}
        </Button>
      </div>
    </form>
  );
}
