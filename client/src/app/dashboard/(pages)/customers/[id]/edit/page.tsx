"use client";

import { Pet } from "@@types/Pet";
import { AsynchronousContent } from "@components/AsynchronousContent";
import { CreateCustomerFormData, CreateCustomerForm } from "@components/customers/CreateCustomerForm";
import { EditCustomerForm, EditCustomerFormData } from "@components/customers/EditCustomerForm";
import { PageTitle } from "@components/dashboard/PageTitle";
import { Button } from "@components/ui/Button";
import { ScrollArea } from "@components/ui/ScrollArea";
import { Table } from "@components/ui/Table";
import { CUSTOMER_KEY, fetchCustomer, updateCustomer } from "@services/queries/Customer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import { PencilSimple, Plus, TrashSimple, X } from "phosphor-react";
import { toast } from "react-hot-toast";

interface EditCustomerMutationPayload {
  id: string;
  data: EditCustomerFormData;
}

const columnHelper = createColumnHelper<Pet>();
const columns = [
  columnHelper.display({
    cell: (props) => props.row.index + 1,
    id: "row-number",
  }),
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: "Nome",
  }),
  columnHelper.accessor("breed", {
    cell: (info) => info.getValue(),
    header: "Celular",
  }),
  columnHelper.accessor("age", {
    cell: (info) => info.getValue(),
    header: "Pets",
  }),
  columnHelper.display({
    header: "Opções",
    cell: (props) => (
      <div className="flex gap-3">
        <Button circle tooltipText="Editar">
          <PencilSimple className="w-6 h-6" />
        </Button>
        <Button circle bg="danger" tooltipText="Remover">
          <TrashSimple className="w-6 h-6" />
        </Button>
      </div>
    ),
  }),
];

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

  async function handleEditCustomer(data: EditCustomerFormData) {
    editCustomerMutation.mutate({ id: params.id, data });
  }

  return (
    <div>
      <PageTitle back="/dashboard/customers" title="Editar cliente" />

      <AsynchronousContent status={customerShowQuery.status} errorMessage={showCustomerErrorMessage()}>
        {() => (
          <>
            <EditCustomerForm
              customer={customerShowQuery.data!.customer}
              isLoading={editCustomerMutation.isLoading}
              onSubmit={handleEditCustomer}
            />
            <div className="prose flex items-center gap-2">
              <h3 className="my-0">Pets</h3>
            </div>
            <Table data={customerShowQuery.data?.customer.pets ?? []} columns={columns} />
            <div>
              <Button tooltipText="Adicionar Pet" type="button" outline circle>
                <Plus />
              </Button>
            </div>
          </>
        )}
      </AsynchronousContent>
    </div>
  );
}
