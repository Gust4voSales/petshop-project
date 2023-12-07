"use client";

import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PageTitle } from "@components/dashboard/PageTitle";
import { deletePetshopService, fetchPetshopServices, PETSHOPSERVICE_KEY } from "@services/queries/PetshopServices";
import { parseCurrencyValueInCentsToBRL } from "@utils/parseCurrency";
import { parseDuration } from "@utils/parseDuration";
import { Button } from "@components/ui/Button";
import { PencilSimple } from "phosphor-react";
import { TooltipDescription } from "@components/services/TooltipDescription";
import { toast } from "react-hot-toast";
import { ConfirmDeletePopover } from "@components/ConfirmDeletePopover";
import { Table } from "@components/ui/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { PetshopService } from "@@types/PetshopServices";

const columnHelper = createColumnHelper<PetshopService>();

export default function Services() {
  const queryClient = useQueryClient();

  const petshopServicesListQuery = useQuery({
    queryKey: [PETSHOPSERVICE_KEY],
    queryFn: fetchPetshopServices,
  });

  const petshopServiceDeleteMutation = useMutation({
    mutationFn: (id: string) => deletePetshopService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PETSHOPSERVICE_KEY] });
      toast.success("Serviço removido com sucesso!");
    },
    onError: () => {
      toast.error("Ops. Ocorreu um problema ao tentar remover o serviço.");
    },
  });

  const columns = [
    columnHelper.display({
      cell: (props) => props.row.index + 1,
      id: "row-number",
    }),
    columnHelper.display({
      header: "Título",
      cell: (props) => (
        <div className="flex gap-2 items-center">
          {props.row.original.title}
          <TooltipDescription description={props.row.original.description} />
        </div>
      ),
    }),
    columnHelper.accessor("value", {
      cell: (info) => parseCurrencyValueInCentsToBRL(info.getValue()),
      header: "Valor",
    }),
    columnHelper.accessor("duration", {
      cell: (info) => parseDuration(info.getValue()),
      header: "Duração",
    }),
    columnHelper.display({
      header: "Opções",
      cell: (props) => (
        <div className="flex gap-3 w-fit">
          <Button circle tooltipText="Editar" asChild>
            <Link href={`/dashboard/services/${props.row.original.id}/edit`}>
              <PencilSimple className="w-6 h-6" />
            </Link>
          </Button>

          <ConfirmDeletePopover
            onConfirmDelete={() => {
              petshopServiceDeleteMutation.mutate(props.row.original.id);
            }}
          />
        </div>
      ),
    }),
  ];

  return (
    <div>
      <PageTitle title="Serviços" />

      <div className="my-4">
        <Table
          data={petshopServicesListQuery.data?.services ?? []}
          columns={columns}
          asyncStatus={petshopServicesListQuery.status}
        />
      </div>

      <Button bg="accent" asChild>
        <Link href="/dashboard/services/new">Novo serviço</Link>
      </Button>
    </div>
  );
}
