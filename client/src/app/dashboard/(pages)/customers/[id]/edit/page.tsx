"use client";

import { APIError } from "@@types/APIError";
import { Pet } from "@@types/Pet";
import { AsynchronousContent } from "@components/AsynchronousContent";
import { ConfirmDeletePopover } from "@components/ConfirmDeletePopover";
import { EditCustomerForm, EditCustomerFormData } from "@components/customers/EditCustomerForm";
import { PetForm, PetFormData } from "@components/customers/pets/PetForm";
import { PageTitle } from "@components/dashboard/PageTitle";
import { Table } from "@components/ui/Table";
import {
  CUSTOMER_KEY,
  addCustomerPet,
  fetchCustomer,
  removeCustomerPet,
  updateCustomer,
} from "@services/queries/Customer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import { toast } from "react-hot-toast";

interface EditCustomerMutationPayload {
  id: string;
  data: EditCustomerFormData;
}

const columnHelper = createColumnHelper<Pet>();

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

  const addPetMutation = useMutation({
    mutationFn: (payload: PetFormData) => addCustomerPet(params.id, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [CUSTOMER_KEY] });

      const updatedCustomer = {
        ...customerShowQuery.data?.customer,
        pets: [...(customerShowQuery.data?.customer.pets ?? []), data.pet],
      };
      queryClient.setQueryData([CUSTOMER_KEY, params.id], { customer: updatedCustomer });

      toast.success("Pet adicionado com sucesso!");
    },
    onError: () => {
      toast.error("Ops. Ocorreu um problema ao tentar adicionar o pet ao cliente.");
    },
  });

  const deletePetMutation = useMutation({
    mutationFn: (petId: string) => removeCustomerPet(petId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CUSTOMER_KEY] });
      toast.success("Pet removido com sucesso!");
    },
    onError: (err: APIError | Error) => {
      if (axios.isAxiosError(err) && (err.response?.data as APIError).name === "InvalidDeleteOperation") {
        toast.error("Não foi possível deletar o pet do cliente pois ele já possui agendamentos.");
      } else {
        toast.error("Ops. Ocorreu um problema ao tentar remover o pet do cliente.");
      }
    },
  });

  const showCustomerErrorMessage = () => {
    const error = customerShowQuery.error;
    if (axios.isAxiosError(error) && error.response?.status === 404) return "Erro! Cliente não encontrado.";
  };

  async function handleEditCustomer(data: EditCustomerFormData) {
    editCustomerMutation.mutate({ id: params.id, data });
  }

  function handleCreatePet(data: PetFormData) {
    addPetMutation.mutate(data);
  }

  function handleEditPet(data: PetFormData) {
    // editCustomerMutation.mutate({ id: params.id, data: { pets: [...customerShowQuery.data!.customer.pets, pet] } });
    alert("EDIT" + JSON.stringify(data));
  }

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
      header: "Idade",
    }),
    columnHelper.display({
      header: "Opções",
      cell: (props) => (
        <div className="flex gap-3">
          <PetForm pet={props.row.original} onSubmit={handleEditPet} />

          <ConfirmDeletePopover
            onConfirmDelete={() => {
              deletePetMutation.mutate(props.row.original.id);
            }}
          />
        </div>
      ),
    }),
  ];

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
              <PetForm onSubmit={handleCreatePet} />
            </div>
          </>
        )}
      </AsynchronousContent>
    </div>
  );
}
