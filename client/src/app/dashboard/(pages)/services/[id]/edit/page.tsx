"use client";

import { PageTitle } from "@components/dashboard/PageTitle";
import { PetshopServiceFormData, ServiceForm } from "@components/services/ServiceForm";
import { PetshopService } from "src/@types/PetshopServices";

export default function EditService({ params }: { params: { id: string } }) {
  const mockService: PetshopService = {
    id: params.id,
    title: "Banho",
    description: "Um banho com shampoos de qualidade e muito carinho!",
    duration: 4000,
    value: 4000,
  };

  async function handleEditService(data: PetshopServiceFormData) {
    alert(JSON.stringify(data));
  }

  return (
    <div>
      <PageTitle back title="Editar serviço" />

      <ServiceForm service={mockService} onSubmit={handleEditService} isLoading={false} />
    </div>
  );
}
