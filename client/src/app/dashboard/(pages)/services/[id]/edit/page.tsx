"use client";

import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AsynchronousContent } from "@components/AsynchronousContent";
import { PageTitle } from "@components/dashboard/PageTitle";
import { PetshopServiceFormData, ServiceForm } from "@components/services/ServiceForm";
import { fetchPetshopService, PETSHOPSERVICE_KEY, updatePetshopService } from "@services/queries/PetshopServices";
import { toast } from "react-hot-toast";
import { convertReaisToCents } from "@utils/parseCurrency";

interface EditPetshopServiceMutationPayload {
  id: string;
  data: PetshopServiceFormData;
}
export default function EditService({ params }: { params: { id: string } }) {
  const queryClient = useQueryClient();

  const petshopServiceShowQuery = useQuery({
    queryKey: [PETSHOPSERVICE_KEY, params.id],
    queryFn: () => fetchPetshopService(params.id),
  });

  const editPetshopServiceMutation = useMutation({
    mutationFn: (payload: EditPetshopServiceMutationPayload) => updatePetshopService(payload.id, payload.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PETSHOPSERVICE_KEY] });
      toast.success("Serviço editado com sucesso!");
    },
    onError: () => {
      toast.error("Ops. Ocorreu um problema ao tentar editar o serviço.");
    },
  });

  const showPetshopServiceErrorMessage = () => {
    const error = petshopServiceShowQuery.error;
    if (axios.isAxiosError(error) && error.response?.status === 404) return "Erro! Serviço não encontrado.";
  };

  async function handleEditService(data: PetshopServiceFormData) {
    const parsedData: PetshopServiceFormData = {
      ...data,
      value: convertReaisToCents(data.value),
    };

    editPetshopServiceMutation.mutate({ id: params.id, data: parsedData });
  }

  return (
    <div>
      <PageTitle back="/dashboard/services" title="Editar serviço" />

      <AsynchronousContent status={petshopServiceShowQuery.status} errorMessage={showPetshopServiceErrorMessage()}>
        <ServiceForm
          service={petshopServiceShowQuery.data?.service}
          onSubmit={handleEditService}
          isLoading={editPetshopServiceMutation.isLoading}
        />
      </AsynchronousContent>
    </div>
  );
}
