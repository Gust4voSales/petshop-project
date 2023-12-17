import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Form/Inputs/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { cellPhonePattern, removeCountryCodeAnd9FromRawPhone } from "@/utils/phoneNumber";
import { removeNonNumericFromString } from "@/utils/removeNonNumericFromString";
import { Controller, useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { Customer } from "src/@types/Customer";
import { z } from "zod";

const editCustomerSchema = z.object({
  name: z
    .string()
    .min(3, "Tamanho mínimo do nome é de 3 caracteres")
    .max(60, "Tamanho máximo do nome é de 60 caracteres"),
  phone: z.string().refine((value) => {
    const rawValue = removeNonNumericFromString(value);
    return rawValue.length === 13;
  }, "Celular inválido"),
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
    control,
    formState: { errors },
  } = useForm<EditCustomerFormData>({
    resolver: zodResolver(editCustomerSchema),
    defaultValues: {
      name: props.customer.name,
      phone: removeCountryCodeAnd9FromRawPhone(props.customer.phone),
    },
  });

  function handleSubmitForm(d: EditCustomerFormData) {
    props.onSubmit({ ...d, phone: removeNonNumericFromString(d.phone) });
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col w-full mt-4 gap-4 flex-wrap">
      <div className="flex gap-2 flex-wrap items-center">
        <fieldset>
          <Input label="Nome" id="name" errorMessage={errors.name?.message} {...register("name")} />
        </fieldset>
        <fieldset>
          <Controller
            control={control}
            name="phone"
            render={({ field: { name, onChange, value, ref } }) => (
              <PatternFormat
                format={cellPhonePattern}
                patternChar="#"
                customInput={Input}
                // Input props are passed to customInput
                label="Celular"
                id="phone"
                type="tel"
                errorMessage={errors.phone?.message}
                name={name}
                onChange={onChange}
                value={value}
                getInputRef={ref}
              />
            )}
          />
        </fieldset>
      </div>
      <div>
        <Button type="submit" bg="submit" isLoading={props.isLoading}>
          Editar
        </Button>
      </div>
    </form>
  );
}
