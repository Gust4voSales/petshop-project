"use client";

import { AsynchronousContent } from "@/components/AsynchronousContent";
import { InfoContent } from "@/components/InfoContent";
import { PageTitle } from "@/components/dashboard/PageTitle";
import { APPOINTMENT_KEY, fetchAppointment, updateAppointmentStatus } from "@/services/queries/Appointment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";
import dayjs from "dayjs";
import Link from "next/link";
import { AppointmentStatus } from "@/@types/Appointment";
import { Select } from "@/components/ui/Form/Inputs/Select";
import { parseAppointmentStatus } from "@/utils/parseAppointmentStatus";
import { useEffect } from "react";
import toast from "react-hot-toast";

type UpdateAppointmentStatusFormData = {
  status: AppointmentStatus | "";
};

export default function EditService({ params }: { params: { id: string } }) {
  const queryClient = useQueryClient();
  const { register, setValue, watch } = useForm<UpdateAppointmentStatusFormData>({
    defaultValues: {
      status: "",
    },
  });
  const appointmentShowQuery = useQuery({
    queryKey: [APPOINTMENT_KEY, params.id],
    queryFn: () => fetchAppointment(params.id),
    refetchOnWindowFocus: false,
  });

  const appointment = appointmentShowQuery.data?.appointment;
  const selectedStatus = watch("status");

  useEffect(() => {
    if (!appointment) return;
    setValue("status", appointment.status);
  }, [appointment]);

  const updateAppointmentStatusMutation = useMutation({
    mutationFn: (status: AppointmentStatus) => updateAppointmentStatus(params.id, status),
    onSuccess: (data) => {
      toast.success("Status atualizado com sucesso!");
      queryClient.invalidateQueries([APPOINTMENT_KEY]);
      queryClient.setQueryData([APPOINTMENT_KEY, params.id], () => ({
        appointment: {
          ...appointmentShowQuery.data?.appointment,
          status: data.appointment.status,
        },
      }));
    },
    onError: () => {
      toast.error("Ops. Ocorreu um problema ao tentar editar o status do agendamento.");
      setValue("status", appointment!.status);
    },
  });

  // selectedStatus changed
  useEffect(() => {
    if (!appointment || selectedStatus === "" || selectedStatus === appointment?.status) return;

    updateAppointmentStatusMutation.mutate(selectedStatus as AppointmentStatus);
  }, [selectedStatus, appointment]);

  const appointmentShowQueryErrorMessage = (() => {
    const error = appointmentShowQuery.error;
    if (axios.isAxiosError(error) && error.response?.status === 404) return "Erro! Agendamento não encontrado.";
  })();

  return (
    <div>
      <PageTitle renderBackOption title="Agendamento" />

      <AsynchronousContent status={appointmentShowQuery.status} errorMessage={appointmentShowQueryErrorMessage}>
        <div>
          <InfoContent label="Horário" value={dayjs(appointment?.appointmentTime).format("DD/MM/YYYY - HH:mm")} />
          <InfoContent
            label="Serviço"
            value={
              <Link
                className="link font-normal tooltip w-fit"
                data-tip={"Ver serviço"}
                href={`/dashboard/services/${appointment?.service?.id}/edit`}
              >
                {appointment?.service?.title}
              </Link>
            }
          />
          <InfoContent
            label="Pet"
            value={
              <Link
                className="link font-normal tooltip w-fit"
                data-tip={"Ver pet"}
                href={`/dashboard/customers/${appointment?.pet.ownerId}/edit`}
              >
                {appointment?.pet.name}
              </Link>
            }
          />
          <InfoContent
            label="Status"
            value={
              <Select {...register("status")} disabled={updateAppointmentStatusMutation.isLoading}>
                <option disabled value="">
                  Selecione um status
                </option>
                {Object.keys(AppointmentStatus).map((status) => (
                  <option key={status} value={status}>
                    {parseAppointmentStatus(status as AppointmentStatus)}
                  </option>
                ))}
              </Select>
            }
          />
        </div>
      </AsynchronousContent>
    </div>
  );
}
