"use client";

import { useQuery } from "@tanstack/react-query";
import { PageTitle } from "@components/dashboard/PageTitle";
import { fetchPetshopServices } from "@services/queries/PetshopServices";
import { parseCurrencyToBRL } from "@utils/parseCurrency";
import { parseDuration } from "@utils/parseDuration";
import { Button } from "@components/ui/Button";
import { ScrollArea } from "@components/ui/ScrollArea";
import { PencilSimple, TrashSimple } from "phosphor-react";
import { TooltipDescription } from "@components/services/TooltipDescription";
import { AsynchronousContent } from "@components/AsynchronousContent";

export default function Services() {
  const petshopServicesListQuery = useQuery({
    queryKey: ["petshopServices-list"],
    queryFn: fetchPetshopServices,
  });

  return (
    <div>
      <PageTitle title="Serviços" />

      <div className="my-4">
        <AsynchronousContent
          status={petshopServicesListQuery.status}
          emptyContent={!petshopServicesListQuery.data?.services.length}
        >
          <ScrollArea>
            <div className="max-h-screen-2/3">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th>Título</th>
                    <th>Valor</th>
                    <th>Duração</th>
                    <th>Opções</th>
                  </tr>
                </thead>

                <tbody>
                  {petshopServicesListQuery.data?.services.map((service, index) => (
                    <tr key={service.id}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="flex gap-2 items-center">
                          {service.title}
                          <TooltipDescription description={service.description} />
                        </div>
                      </td>
                      <td>{parseCurrencyToBRL(service.value)}</td>
                      <td>{parseDuration(service.duration)}</td>
                      <td>
                        <div className="flex gap-3">
                          <Button intent="circle" tooltip="Editar">
                            <PencilSimple className="w-6 h-6" />
                          </Button>
                          <Button intent="circle" bg="danger" tooltip="Remover">
                            <TrashSimple className="w-6 h-6" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollArea>
        </AsynchronousContent>
      </div>

      <Button bg="accent">Novo serviço</Button>
    </div>
  );
}
