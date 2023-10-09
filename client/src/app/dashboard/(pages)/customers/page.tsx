"use client";

import { AsynchronousContent } from "@components/AsynchronousContent";
import { PageTitle } from "@components/dashboard/PageTitle";
import { Button } from "@components/ui/Button";
import { ScrollArea } from "@components/ui/ScrollArea";
import { Table } from "@components/ui/Table";
import { fetchCustomers } from "@services/queries/Customer";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { PencilSimple, TrashSimple } from "phosphor-react";
import { Customer } from "@@types/Customer";

const columnHelper = createColumnHelper<Customer>();

export default function Customers() {
  const customersListQuery = useQuery({
    queryKey: ["customers-list"],
    queryFn: fetchCustomers,
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
      cell: (info) => info.getValue(),
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
          <Button circle bg="danger" tooltipText="Remover">
            <TrashSimple className="w-6 h-6" />
          </Button>
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
