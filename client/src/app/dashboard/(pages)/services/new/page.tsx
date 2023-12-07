"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PageTitle } from "@components/dashboard/PageTitle";
import { ServiceForm } from "@components/services/ServiceForm";
import { createPetshopService, PETSHOPSERVICE_KEY } from "@services/queries/PetshopServices";
import { convertReaisToCents } from "@utils/parseCurrency";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CreatePetshopServiceData } from "@@types/PetshopServices";

export default function NewService() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createPetshopServiceMutation = useMutation({
    mutationFn: (data: CreatePetshopServiceData) => createPetshopService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PETSHOPSERVICE_KEY] });
      toast.success("Serviço criado com sucesso!");
      router.push("/dashboard/services");
    },
    onError: (err) => {
      toast.error("Ops. Ocorreu um problema ao tentar criar o serviço.");
    },
  });

  async function handleCreateService(data: CreatePetshopServiceData) {
    const parsedData: CreatePetshopServiceData = {
      ...data,
      value: convertReaisToCents(data.value),
    };

    createPetshopServiceMutation.mutate(parsedData);
  }

  return (
    <div>
      <PageTitle renderBackOption title="Novo serviço" />

      <ServiceForm onSubmit={handleCreateService} isLoading={createPetshopServiceMutation.isLoading} />
    </div>
  );
}
