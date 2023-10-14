import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Form/Inputs/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Customer } from "src/@types/Customer";
import { z } from "zod";

const editCustomerSchema = z.object({
  name: z
    .string()
    .min(3, "Tamanho mínimo do nome é de 3 caracteres")
    .max(60, "Tamanho máximo do nome é de 60 caracteres"),
  phone: z
    .string()
    .trim()
    .min(8, "Tamanho mínimo do celular é de 8 caracteres")
    .max(18, "Tamanho máximo do celular é de 18 caracteres"),
});

export type EditCustomerFormData = z.infer<typeof editCustomerSchema>;

interface Props {
  customer: Customer;
  onSubmit: (d: EditCustomerFormData) => Promise<void>;
  isLoading: boolean;
}
export function EditCustomerForm(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditCustomerFormData>({
    resolver: zodResolver(editCustomerSchema),
    defaultValues: {
      name: props.customer?.name ?? "",
      phone: props.customer?.phone ?? "",
    },
  });

  return (
    <form onSubmit={handleSubmit(props.onSubmit)} className="flex flex-col w-full mt-4 gap-4 flex-wrap">
      <div className="flex gap-2 flex-wrap items-center">
        <fieldset>
          <Input label="Nome" id="name" errorMessage={errors.name?.message} {...register("name")} />
        </fieldset>
        <fieldset>
          <Input label="Celular" id="phone" type="tel" errorMessage={errors.phone?.message} {...register("phone")} />
        </fieldset>
        <Button type="submit" bg="submit" isLoading={props.isLoading}>
          Editar
        </Button>
      </div>
    </form>
  );
}
