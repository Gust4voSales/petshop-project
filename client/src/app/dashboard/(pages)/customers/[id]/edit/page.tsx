"use client";

import { AsynchronousContent } from "@components/AsynchronousContent";
import { CreateCustomerFormData, CreateCustomersForm } from "@components/customers/CreateCustomersForm";
import { PageTitle } from "@components/dashboard/PageTitle";
import { CUSTOMER_KEY, fetchCustomer, updateCustomer } from "@services/queries/Customer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

interface EditCustomerMutationPayload {
  id: string;
  data: CreateCustomerFormData;
}
export default function EditCustomer({ params }: { params: { id: string } }) {
  const queryClient = useQueryClient();

  const customerShowQuery = useQuery({
    queryKey: [CUSTOMER_KEY, params.id],
    queryFn: () => fetchCustomer(params.id),
  });

  const editCustomerMutation = useMutation({
    mutationFn: (payload: EditCustomerMutationPayload) => updateCustomer(payload.id, payload.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CUSTOMER_KEY] });
      toast.success("Cliente editado com sucesso!");
    },
    onError: () => {
      toast.error("Ops. Ocorreu um problema ao tentar editar o cliente.");
    },
  });

  const showCustomerErrorMessage = () => {
    const error = customerShowQuery.error;
    if (axios.isAxiosError(error) && error.response?.status === 404) return "Erro! Cliente não encontrado.";
  };

  async function handleEditCustomer(data: CreateCustomerFormData) {
    editCustomerMutation.mutate({ id: params.id, data });
  }

  return (
    <div>
      <PageTitle back="/dashboard/customers" title="Editar cliente" />

      <AsynchronousContent status={customerShowQuery.status} errorMessage={showCustomerErrorMessage()}>
        {customerShowQuery.data?.customer.name}
        {customerShowQuery.data?.customer.phone}
        <div className="mt-4">
          PETS
          {customerShowQuery.data?.customer.pets.map((p) => (
            <li key={p.id}>{JSON.stringify(p)}</li>
          ))}
        </div>
      </AsynchronousContent>
    </div>
  );
}
