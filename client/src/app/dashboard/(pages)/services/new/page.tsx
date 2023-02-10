"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PageTitle } from "@components/dashboard/PageTitle";
import { PetshopServiceFormData, ServiceForm } from "@components/services/ServiceForm";
import { createPetshopService } from "@services/queries/PetshopServices";
import { convertReaisToCents } from "@utils/parseCurrency";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function NewService() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createPetshopServiceMutation = useMutation({
    mutationFn: (data: PetshopServiceFormData) => createPetshopService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["petshopServices-list"] });
      router.push("/dashboard/services");
    },
    onError: (err) => {
      toast.error("Ops. Ocorreu um problema ao tentar criar o serviço.");
    },
  });

  async function handleCreateService(data: PetshopServiceFormData) {
    const parsedData: PetshopServiceFormData = {
      ...data,
      value: convertReaisToCents(data.value),
    };

    createPetshopServiceMutation.mutate(parsedData);
  }

  return (
    <div>
      <PageTitle back title="Novo serviço" />

      <ServiceForm onSubmit={handleCreateService} isLoading={createPetshopServiceMutation.isLoading} />
    </div>
  );
}
