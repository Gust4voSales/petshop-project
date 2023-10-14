import { Customer } from "@@types/Customer";
import { Pet } from "@@types/Pet";
import { Button } from "@components/ui/Button";
import { Table } from "@components/ui/Table";
import { fetchCustomers } from "@services/queries/Customer";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { Check, X } from "phosphor-react";
import { useEffect, useMemo, useState } from "react";

type Props = {
  onPetSelectionChange: (id: string | undefined) => void;
};

const columnHelperCustomer = createColumnHelper<Customer>();
const columnHelperPet = createColumnHelper<Pet>();

export function SelectCustomerPet({ onPetSelectionChange }: Props) {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>();
  const [selectedPetId, setSelectedPetId] = useState<string>();

  const customersListQuery = useQuery({
    queryKey: ["customers-list"],
    queryFn: fetchCustomers,
  });

  const selectedCustomer = useMemo(() => {
    return customersListQuery.data?.customers.find((customer) => customer.id === selectedCustomerId);
  }, [selectedCustomerId, customersListQuery.data]);
  const selectedPet = useMemo(() => {
    return selectedCustomer?.pets.find((pet) => pet.id === selectedPetId);
  }, [selectedPetId, selectedCustomer]);

  useEffect(() => {
    setSelectedPetId(undefined);
  }, [selectedCustomerId]);

  useEffect(() => {
    onPetSelectionChange(selectedPetId);
  }, [selectedPetId]);

  function handleOpenModal() {
    const modal = document.getElementById("SelectCustomerModal") as any;
    modal?.showModal();
  }

  function onModalClose() {
    if (selectedPetId === undefined) {
      setSelectedCustomerId(undefined);
    }
  }

  function toggleSelectCustomer(id: string) {
    setSelectedCustomerId((oldState) => (oldState === id ? undefined : id));
  }
  function toggleSelectPet(id: string) {
    if (selectedPetId !== id) {
      setSelectedPetId(id);
      const modal = document.getElementById("SelectCustomerModal") as any;
      modal?.close();
    } else {
      setSelectedPetId(undefined);
    }
  }

  const customerColumns = [
    columnHelperCustomer.display({
      cell: (props) => props.row.index + 1,
      id: "row-number",
    }),
    columnHelperCustomer.accessor("name", {
      cell: (info) => info.getValue(),
      header: "Nome",
    }),
    columnHelperCustomer.accessor("phone", {
      cell: (info) => info.getValue(),
      header: "Celular",
    }),
    columnHelperCustomer.accessor("pets", {
      cell: (info) => info.getValue().length,
      header: "Pets",
    }),
    columnHelperCustomer.display({
      header: "Selecionar",
      cell: (props) => (
        <Button
          circle
          tooltipText={props.row.original.id === selectedCustomerId ? "Remover seleção" : "Selecionar"}
          onClick={() => toggleSelectCustomer(props.row.original.id)}
          disabled={props.row.original.pets.length === 0}
        >
          {props.row.original.id === selectedCustomerId ? <X className="w-6 h-6" /> : <Check className="w-6 h-6" />}
        </Button>
      ),
    }),
  ];

  const petColumns = [
    columnHelperPet.display({
      cell: (props) => props.row.index + 1,
      id: "row-number",
    }),
    columnHelperPet.accessor("name", {
      cell: (info) => info.getValue(),
      header: "Nome",
    }),
    columnHelperPet.accessor("age", {
      cell: (info) => info.getValue(),
      header: "Idade",
    }),
    columnHelperPet.accessor("breed", {
      cell: (info) => info.getValue(),
      header: "Raça",
    }),
    columnHelperPet.display({
      header: "Selecionar",
      cell: (props) => (
        <Button
          circle
          tooltipText={props.row.original.id === selectedPetId ? "Remover seleção" : "Selecionar"}
          onClick={() => toggleSelectPet(props.row.original.id)}
        >
          {props.row.original.id === selectedPetId ? <X className="w-6 h-6" /> : <Check className="w-6 h-6" />}
        </Button>
      ),
    }),
  ];

  const Content = () => {
    if (selectedCustomerId === undefined) {
      return (
        <div>
          <div className="prose">
            <h4>Selecionar Cliente</h4>
          </div>
          <Table
            data={customersListQuery.data?.customers ?? []}
            columns={customerColumns}
            asyncStatus={customersListQuery.status}
          />
        </div>
      );
    }

    return (
      <div>
        <div className="prose">
          <h4>
            Selecionar Pet do cliente{" "}
            <button
              onClick={() => toggleSelectCustomer(selectedCustomerId)}
              data-tip="Remover seleção"
              className="tooltip underline text-error"
            >
              {selectedCustomer?.name}
            </button>
          </h4>
        </div>
        <Table data={selectedCustomer?.pets ?? []} columns={petColumns} />
      </div>
    );
  };

  return (
    <div>
      <Button onClick={handleOpenModal} type="button">
        {selectedPet?.name ?? "Selecionar Pet"}
      </Button>
      <dialog id="SelectCustomerModal" onClose={onModalClose} className="modal">
        <div className="modal-box max-w-2xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div>
            <div className="prose">
              <h2>Selecionar Pet</h2>
            </div>
            <div className="divider" />
            <Content />
          </div>
        </div>
      </dialog>
    </div>
  );
}
