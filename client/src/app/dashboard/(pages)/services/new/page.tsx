"use client";

import { PageTitle } from "@components/dashboard/PageTitle";
import { PetshopServiceFormData, ServiceForm } from "@components/services/ServiceForm";

export default function NewService() {
  async function handleCreateService(data: PetshopServiceFormData) {
    alert(JSON.stringify(data));
  }

  return (
    <div>
      <PageTitle back title="Novo serviço" />

      <ServiceForm onSubmit={handleCreateService} />
    </div>
  );
}
