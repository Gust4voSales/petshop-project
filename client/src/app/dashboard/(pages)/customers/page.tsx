"use client";

import { PageTitle } from "@components/dashboard/PageTitle";
import { Button } from "@components/ui/Button";
import { Table } from "@components/ui/Table";
import { CUSTOMER_KEY, deleteCustomer, fetchCustomers } from "@services/queries/Customer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { PencilSimple, TrashSimple } from "phosphor-react";
import { Customer } from "@@types/Customer";
import { ConfirmDeletePopover } from "@components/ConfirmDeletePopover";
import toast from "react-hot-toast";
import axios from "axios";
import { APIError } from "@@types/API";
import { patternFormatter } from "react-number-format";
import { cellPhonePattern, removeCountryCodeAnd9FromRawPhone } from "@utils/phoneNumber";

const columnHelper = createColumnHelper<Customer>();

export default function Customers() {
  const queryClient = useQueryClient();
  const customersListQuery = useQuery({
    queryKey: [CUSTOMER_KEY],
    queryFn: fetchCustomers,
  });

  const deleteCustomerMutation = useMutation({
    mutationFn: (id: string) => deleteCustomer(id),
    onSuccess: () => {
      toast.success("Cliente excluído com sucesso");
      queryClient.invalidateQueries([CUSTOMER_KEY]);
    },
    onError: (err) => {
      if (axios.isAxiosError(err) && (err.response?.data as APIError).name === "InvalidDeleteOperation") {
        toast.error("Não foi possível deletar o cliente pois ele já possui agendamentos.");
      } else {
        toast.error("Ops. Ocorreu um problema ao tentar remover o cliente.");
      }
    },
  });

  const columns = [
    columnHelper.display({
      cell: (props) => props.row.index + 1,
      id: "row-number",
    }),
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: "Nome",
    }),
    columnHelper.accessor("phone", {
      cell: (info) =>
        patternFormatter(removeCountryCodeAnd9FromRawPhone(info.getValue()), {
          format: cellPhonePattern,
          patternChar: "#",
        }),
      header: "Celular",
    }),
    columnHelper.accessor("pets", {
      cell: (info) => info.getValue().length,
      header: "Pets",
    }),
    columnHelper.display({
      header: "Opções",
      cell: (props) => (
        <div className="flex gap-3">
          <Button circle tooltipText="Editar" asChild>
            <Link href={`/dashboard/customers/${props.row.original.id}/edit`}>
              <PencilSimple className="w-6 h-6" />
            </Link>
          </Button>
          <ConfirmDeletePopover onConfirmDelete={() => deleteCustomerMutation.mutate(props.row.original.id)} />
        </div>
      ),
    }),
  ];

  return (
    <div>
      <PageTitle title="Clientes" />

      <div className="my-4">
        <Table
          data={customersListQuery.data?.customers ?? []}
          columns={columns}
          asyncStatus={customersListQuery.status}
        />
      </div>

      <Button bg="accent" asChild>
        <Link href={"/dashboard/customers/new"}>Novo cliente</Link>
      </Button>
    </div>
  );
}
