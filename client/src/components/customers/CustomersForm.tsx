import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Form/Inputs/Input";
import { SpinLoading } from "@components/ui/Loading/SpinLoading";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
});

export type CustomerFormData = z.infer<typeof customerSchema>;

interface Props {
  customer?: Customer;
  onSubmit: (d: CustomerFormData) => Promise<void>;
  isLoading: boolean;
}
export function CustomersForm(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: props.customer?.name ?? "",
      phone: props.customer?.phone ?? "",
    },
  });

  const getSubmitButtonText = () => (props.customer ? "Editar" : "Criar");

  return (
    <form onSubmit={handleSubmit(props.onSubmit)} className="flex items-center w-full mt-4 gap-4 flex-wrap">
      {/* xs:flex-col xs:items-start */}
      <div className="flex gap-2 flex-wrap">
        <fieldset>
          <Input label="Nome" id="name" errorMessage={errors.name?.message} {...register("name")} />
        </fieldset>
        <fieldset>
          <Input label="Celular" id="phone" type="tel" errorMessage={errors.phone?.message} {...register("phone")} />
        </fieldset>
      </div>

      <div>
        <Button type="submit" bg="submit" disabled={props.isLoading}>
          {props.isLoading ? <SpinLoading /> : getSubmitButtonText()}
        </Button>
      </div>
    </form>
  );
}
