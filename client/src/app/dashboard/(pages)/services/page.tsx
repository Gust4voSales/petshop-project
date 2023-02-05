"use client";

import { useQuery } from "react-query";
import { PageTitle } from "@app/dashboard/(components)/PageTitle";
import { fetchPetshopServices } from "@services/queries/PetshopServices";
import { parseCurrecyToBRL } from "@utils/parseCurrency";
import { parseDuration } from "@utils/parseDuration";
import { Button } from "@components/ui/Button";
import { PencilSimple, TrashSimple } from "phosphor-react";
import { TooltipDescription } from "./(components)/TooltipDescription";
import { ScrollArea } from "@components/ui/ScrollArea";

export default function Services() {
  const petshopServicesListQuery = useQuery("petshopServices-list", fetchPetshopServices, {
    onError: (err) => {
      console.log(err);
    },
  });

  if (petshopServicesListQuery.isLoading) {
    return (
      <div>
        <PageTitle title="Serviços" />

        <span>LOADING...</span>
      </div>
    );
  }

  return (
    <div>
      <PageTitle title="Serviços" />

      <ScrollArea className="my-4">
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
                  <td>{parseCurrecyToBRL(service.value)}</td>
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

      <Button bg="accent">Novo serviço</Button>
    </div>
  );
}
