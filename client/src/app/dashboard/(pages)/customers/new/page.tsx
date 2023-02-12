"use client";

import { CustomerFormData, CustomersForm } from "@components/customers/CustomersForm";
import { PageTitle } from "@components/dashboard/PageTitle";
import { createCustomer, CUSTOMER_KEY } from "@services/queries/Customer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function NewCustomer() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createCustomerMutation = useMutation({
    mutationFn: (d: CustomerFormData) => createCustomer(d),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [CUSTOMER_KEY] });
      toast.success("Cliente criado com sucesso!");
      router.push(`/dashboard/customers/${data.customer.id}/edit`);
    },
    onError: () => {
      toast.error("Ops. Ocorreu um problema ao tentar criar o cliente.");
    },
  });

  async function handleCreateCustomer(data: CustomerFormData) {
    createCustomerMutation.mutate(data);
  }

  return (
    <div>
      <PageTitle back title="Novo cliente" />

      <CustomersForm onSubmit={handleCreateCustomer} isLoading={createCustomerMutation.isLoading} />
    </div>
  );
}
