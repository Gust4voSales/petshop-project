"use client";
import { Appointment } from "@@types/Appointment";
import { PageTitle } from "@components/dashboard/PageTitle";
import { Button } from "@components/ui/Button";
import { Table } from "@components/ui/Table";
import { APPOINTMENT_KEY, fetchAppointments } from "@services/queries/Appointment";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { parseAppointmentStatus } from "@utils/parseAppointmentStatus";
import dayjs from "dayjs";
import Link from "next/link";
import { ArrowLeft, ArrowRight, PencilSimple } from "phosphor-react";
import { useState } from "react";

const columnHelper = createColumnHelper<Appointment>();

const columns = [
  columnHelper.display({
    cell: (props) => props.row.index + 1,
    id: "row-number",
  }),
  columnHelper.accessor("appointmentTime", {
    cell: (info) => dayjs(info.getValue()).format("HH:mm"),
    header: "Horário",
  }),
  columnHelper.display({
    header: "Pet",
    cell: (props) => (
      <Link
        className="link tooltip"
        data-tip={"Ver pet"}
        href={`/dashboard/customers/${props.row.original.pet.ownerId}/edit`}
      >
        {props.row.original.pet.name}
      </Link>
    ),
  }),
  columnHelper.display({
    header: "Serviço",
    cell: (props) => (
      <Link
        className="link tooltip"
        data-tip={"Ver servico"}
        href={`/dashboard/services/${props.row.original.service.id}/edit`}
      >
        {props.row.original.service.title}
      </Link>
    ),
  }),
  columnHelper.accessor("status", {
    cell: (info) => parseAppointmentStatus(info.getValue()),
    header: "Status",
  }),
  columnHelper.display({
    header: "Acões",
    cell: (props) => (
      <Button circle tooltipText="Editar" asChild>
        <Link href={`/dashboard/appointments/${props.row.original.id}/edit`}>
          <PencilSimple className="w-6 h-6" />
        </Link>
      </Button>
    ),
  }),
];

const now = dayjs();
const today = now.format("YYYY-MM-DD");

export default function Appointments() {
  const [date, setDate] = useState(today);
  const dateTimestamp = dayjs(date).isValid() ? dayjs(date).toISOString() : dayjs(today).toISOString();

  const appointmentsListQuery = useQuery({
    queryKey: [APPOINTMENT_KEY, dateTimestamp],
    queryFn: () => fetchAppointments({ startDate: dateTimestamp, endDate: dateTimestamp }),
  });

  function handleIncrementDate(increment: -1 | 1) {
    const newDate = dayjs(date).add(increment, "day").format("YYYY-MM-DD");
    setDate(newDate);
  }

  return (
    <div>
      {dateTimestamp}
      <PageTitle title="Agendamentos" />

      <div className="flex items-center justify-center">
        <Button bg="ghost" circle onClick={() => handleIncrementDate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <input
          type="date"
          className="input input-bordered"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Button bg="ghost" circle onClick={() => handleIncrementDate(1)}>
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>

      <div className="mb-4">
        <Table
          data={appointmentsListQuery.data?.appointments ?? []}
          columns={columns}
          asyncStatus={appointmentsListQuery.status}
        />
      </div>

      <Button bg="accent" asChild>
        <Link href={"/dashboard/appointments/new"}>Novo agendamento</Link>
      </Button>
    </div>
  );
}
