"use client";
import { Appointment, AppointmentStatus } from "@@types/Appointment";
import { PageTitle } from "@components/dashboard/PageTitle";
import { Button } from "@components/ui/Button";
import { Select } from "@components/ui/Form/Inputs/Select";
import { Label } from "@components/ui/Form/Label";
import { Table } from "@components/ui/Table";
import { APPOINTMENT_KEY, fetchAppointments } from "@services/queries/Appointment";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { parseAppointmentStatus } from "@utils/parseAppointmentStatus";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Funnel, PencilSimple } from "phosphor-react";
import customParseFormatPlugin from "dayjs/plugin/customParseFormat";
import { z } from "zod";

dayjs.extend(customParseFormatPlugin);

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
  const router = useRouter();
  const searchParams = useSearchParams();

  const date = parseDateParam();
  const status = parseStatusParam();

  const dateTimestamp = dayjs(date).toISOString(); // value sent to the query
  const appointmentsListQuery = useQuery({
    queryKey: [APPOINTMENT_KEY, dateTimestamp, status],
    queryFn: () =>
      fetchAppointments({
        startDate: dateTimestamp,
        endDate: dateTimestamp,
        status: !!status ? status : undefined,
      }),
  });

  function changeQueryParams(params: string) {
    router.replace("/dashboard/appointments?" + params);
  }

  function parseDateParam() {
    const dateParam = searchParams.get("date");
    const validDateParam = dayjs(dateParam, "YYYY-MM-DD", true).isValid();

    if (validDateParam) {
      return dateParam as string;
    }
    // default to today
    return today;
  }

  function parseStatusParam() {
    const statusParam = searchParams.get("status");

    const appointmentStatusSchema = z.nativeEnum(AppointmentStatus);
    const validStatusParam = appointmentStatusSchema.safeParse(statusParam).success;

    if (validStatusParam) {
      return statusParam as AppointmentStatus;
    }
    // default to empty
    return "";
  }

  function handleChangeDate(date: string) {
    const params = new URLSearchParams(searchParams);
    params.set("date", date);

    changeQueryParams(params.toString());
  }

  function handleIncrementDate(increment: -1 | 1) {
    const newDate = dayjs(date).add(increment, "day").format("YYYY-MM-DD");
    handleChangeDate(newDate);
  }

  function handleChangeStatus(status: AppointmentStatus | "") {
    const params = new URLSearchParams(searchParams);
    params.set("status", status);

    changeQueryParams(params.toString());
  }

  return (
    <div>
      <PageTitle title="Agendamentos" />

      <div className="flex mb-4">
        <div className="w-full">
          <Table
            data={appointmentsListQuery.data?.appointments ?? []}
            columns={columns}
            asyncStatus={appointmentsListQuery.status}
          />
        </div>

        <div className="divider divider-horizontal divider-accent"></div>

        <div className="prose">
          <h3 className="flex items-center gap-2 w-40">
            <Funnel size={16} weight="fill" /> Filtros
          </h3>

          <div>
            <Label htmlFor="date">Data</Label>
            <div className="flex items-center justify-center">
              <Button bg="ghost" circle onClick={() => handleIncrementDate(-1)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <input
                type="date"
                className="input input-bordered"
                required
                id="date"
                value={date}
                onChange={(e) => handleChangeDate(e.target.value)}
              />
              <Button bg="ghost" circle onClick={() => handleIncrementDate(1)}>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            <Select
              value={status}
              name="status"
              id="status"
              onChange={(e) => handleChangeStatus(e.target.value as AppointmentStatus)}
              label="Status"
            >
              <option value="">-</option>
              <option value={AppointmentStatus.PENDING}>Pendentes</option>
              <option value={AppointmentStatus.CANCELED}>Cancelados</option>
              <option value={AppointmentStatus.DONE}>Concluídos</option>
            </Select>
          </div>
        </div>
      </div>

      <Button bg="accent" asChild>
        <Link href={"/dashboard/appointments/new"}>Novo agendamento</Link>
      </Button>
    </div>
  );
}
