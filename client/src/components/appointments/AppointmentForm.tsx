import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Form/Inputs/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import dayjs from "dayjs";
import { SelectCustomerPet } from "./SelectCustomerPet";
import { Label } from "@components/ui/Form/Label";
import { Select } from "@components/ui/Form/Inputs/Select";
import { useQuery } from "@tanstack/react-query";
import { PETSHOPSERVICE_KEY, fetchPetshopServices } from "@services/queries/PetshopServices";

const appointmentSchema = z.object({
  appointmentTime: z.coerce
    .date({
      errorMap: (issue, { defaultError }) => ({
        message: issue.code === "invalid_date" ? "Data inválida" : defaultError, // https://github.com/colinhacks/zod/issues/1526
      }),
    })
    .refine(
      (d) => {
        const now = dayjs();
        return dayjs(d).isAfter(now);
      },
      {
        message: "Horário de agendamento não pode ser anterior o horário atual",
      }
    ),
  petId: z
    .string({
      required_error: "É necessário selecionar um pet",
    })
    .uuid("É necessário selecionar um pet"),
  serviceId: z
    .string({
      required_error: "É necessário selecionar um serviço",
    })
    .uuid("É necessário selecionar um serviço"),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;

interface Props {
  onSubmit: (d: AppointmentFormData) => Promise<void>;
  isLoading: boolean;
}
export function AppointmentForm(props: Props) {
  const todayTimestamp = dayjs().format("YYYY-MM-DD[T]HH:mm");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    resetField,
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      appointmentTime: undefined,
      petId: undefined,
      serviceId: "",
    },
  });

  const petshopServicesListQuery = useQuery({
    queryKey: [PETSHOPSERVICE_KEY],
    queryFn: fetchPetshopServices,
  });

  function onPetSelectionChange(petId: string | undefined) {
    if (petId) {
      setValue("petId", petId);
    } else {
      resetField("petId", {
        defaultValue: undefined,
      });
    }
  }

  const handleFormSubmit = (data: AppointmentFormData) => {
    props.onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full max-w-2xl mt-4">
      <div className="flex flex-col justify-between w-full">
        <div className="flex gap-8">
          <fieldset>
            <Label>Selecione o Pet</Label>
            <input className="hidden" {...register("petId")} />
            <SelectCustomerPet onPetSelectionChange={onPetSelectionChange} />
            <Label error>{errors.petId?.message}</Label>
          </fieldset>
          <fieldset>
            <Select label="Serviço" id="serviceId" errorMessage={errors.serviceId?.message} {...register("serviceId")}>
              <option disabled value="">
                Selecione um serviço
              </option>
              {petshopServicesListQuery.data?.services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title}
                </option>
              ))}
            </Select>
          </fieldset>
        </div>

        <fieldset className="w-60">
          <Input
            type="datetime-local"
            label="Horário"
            id="appointmentTime"
            errorMessage={errors.appointmentTime?.message}
            {...register("appointmentTime")}
            required
            min={todayTimestamp}
          />
        </fieldset>
      </div>

      <div className="mt-8">
        <Button type="submit" bg="submit" isLoading={props.isLoading}>
          Criar
        </Button>
      </div>
    </form>
  );
}
