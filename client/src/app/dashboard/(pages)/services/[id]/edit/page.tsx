"use client";

import { AsynchronousContent } from "@components/AsynchronousContent";
import { PageTitle } from "@components/dashboard/PageTitle";
import { PetshopServiceFormData, ServiceForm } from "@components/services/ServiceForm";
import { fetchPetshopService } from "@services/queries/PetshopServices";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function EditService({ params }: { params: { id: string } }) {
  const petshopServiceShowQuery = useQuery({
    queryKey: ["petshopService-show", params.id],
    queryFn: () => fetchPetshopService(params.id),
  });

  const errorMessage = () => {
    const error = petshopServiceShowQuery.error;
    if (axios.isAxiosError(error) && error.response?.status === 404) return "Erro! Serviço não encontrado.";
  };

  async function handleEditService(data: PetshopServiceFormData) {
    alert(JSON.stringify(data));
  }

  return (
    <div>
      <PageTitle back title="Editar serviço" />

      <AsynchronousContent status={petshopServiceShowQuery.status} errorMessage={errorMessage()}>
        <ServiceForm service={petshopServiceShowQuery.data?.service} onSubmit={handleEditService} isLoading={false} />
      </AsynchronousContent>
    </div>
  );
}
