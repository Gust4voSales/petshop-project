"use client";

import { AsynchronousContent } from "@components/AsynchronousContent";
import { PageTitle } from "@components/dashboard/PageTitle";
import { Button } from "@components/ui/Button";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { fetchCustomers } from "@services/queries/Customer";
import { useQuery } from "@tanstack/react-query";
import { PencilSimple, TrashSimple } from "phosphor-react";

export default function Customers() {
  const customersListQuery = useQuery({
    queryKey: ["customers-list"],
    queryFn: fetchCustomers,
  });

  return (
    <div>
      <PageTitle title="Clientes" />

      <div className="my-4">
        <AsynchronousContent
          status={customersListQuery.status}
          emptyContent={!customersListQuery.data?.customers.length}
        >
          <ScrollArea>
            <div className="max-h-screen-2/3">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th>Nome</th>
                    <th>Celular</th>
                    <th>Pets</th>
                    <th>Opções</th>
                  </tr>
                </thead>

                <tbody>
                  {customersListQuery.data?.customers.map((customer, index) => (
                    <tr key={customer.id}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="flex gap-2 items-center">{customer.name}</div>
                      </td>
                      <td>{customer.phone}</td>
                      <td>{customer.pets.length}</td>
                      <td>
                        <div className="flex gap-3">
                          <Button circle tooltipText="Editar">
                            <PencilSimple className="w-6 h-6" />
                          </Button>
                          <Button circle bg="danger" tooltipText="Remover">
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

      <Button bg="accent">Novo cliente</Button>
    </div>
  );
}
