import { Button } from "@components/ui/Button";
import { CurrencyInput } from "@components/ui/Form/Inputs/CurrencyInput";
import { Input } from "@components/ui/Form/Inputs/Input";
import { TextArea } from "@components/ui/Form/TextArea";
import { SpinLoading } from "@components/ui/Loading/SpinLoading";
import { zodResolver } from "@hookform/resolvers/zod";
import { convertCentsToReais } from "@utils/parseCurrency";
import { SubmitHandler, useForm } from "react-hook-form";
import { PetshopService } from "src/@types/PetshopServices";
import { z } from "zod";

const petshopServiceSchema = z.object({
  title: z.string().min(1, "O título é obrigatório").max(60, "Tamanho máximo do título é de 60 caracteres"),
  description: z
    .string()
    .min(1, "A descrição é obrigatória")
    .max(120, "Tamanho máximo da descrição é de 120 caracteres"),
  value: z.coerce
    .number()
    .min(0.01, "Valor mínimo é de 1 centavo")
    .max(100_000_000_000, "Valor máximo é de R$100.000.000.000"),
  duration: z.coerce
    .number()
    .min(1, "Valor mínimo é de 1s")
    .max(24 * 60 * 60, "Valor máximo é de 86400s (24h)"), // MAX of 86400 seconds (24h) --> 24h * 60min * 60s
});

export type PetshopServiceFormData = z.infer<typeof petshopServiceSchema>;

interface Props {
  service?: PetshopService;
  onSubmit: (d: PetshopServiceFormData) => Promise<void>;
  isLoading: boolean;
}
export function ServiceForm(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PetshopServiceFormData>({
    resolver: zodResolver(petshopServiceSchema),
    defaultValues: {
      title: props.service?.title ?? "",
      description: props.service?.description ?? "",
      value: props.service ? convertCentsToReais(props.service.value) : 0.01,
      duration: props.service?.duration ?? 3600,
    },
  });

  const getSubmitButtonText = () => (props.service ? "Editar" : "Criar");

  const handleFormSubmit: SubmitHandler<PetshopServiceFormData> = async (data) => {
    props.onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full max-w-2xl mt-4">
      <div className="flex justify-between w-full [&>div]:w-72">
        <div>
          <fieldset>
            <Input label="Título" id="title" errorMessage={errors.title?.message} {...register("title")} />
          </fieldset>

          <fieldset>
            <TextArea
              label="Descrição"
              id="description"
              errorMessage={errors.description?.message}
              {...register("description")}
            />
          </fieldset>
        </div>

        <div>
          <fieldset>
            <Input
              label="Duração (em segundos)"
              type="number"
              id="duration"
              errorMessage={errors.duration?.message}
              {...register("duration")}
            />
          </fieldset>
          <fieldset>
            <CurrencyInput label="Valor" id="value" errorMessage={errors.value?.message} {...register("value")} />
          </fieldset>
        </div>
      </div>

      <div className="mt-4">
        <Button type="submit" bg="submit" disabled={props.isLoading}>
          {props.isLoading ? <SpinLoading /> : getSubmitButtonText()}
        </Button>
      </div>
    </form>
  );
}
