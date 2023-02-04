"use client";

import { useQuery } from "react-query";
import { PageTitle } from "@app/dashboard/(components)/PageTitle";
import { fetchPetshopServices } from "@services/Queries/PetshopServices";
import { parseCurrecyToBRL } from "@utils/parseCurrency";
import { parseDuration } from "@utils/parseDuration";
import { Button } from "@components/ui/Button";
import { Article, PencilSimple, TrashSimple } from "phosphor-react";

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

      <table className="table table-zebra w-full my-4">
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
                  <Article className="w-5 h-5" />
                </div>
              </td>
              <td>{parseCurrecyToBRL(service.value)}</td>
              <td>{parseDuration(service.duration)}</td>
              <td>
                <div className="flex gap-3">
                  <Button intent="circle" bg="info" tooltip="Editar">
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
  );
}
