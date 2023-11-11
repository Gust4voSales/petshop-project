"use client";
import { AppointmentForm, AppointmentFormData } from "@components/appointments/AppointmentForm";
import { PageTitle } from "@components/dashboard/PageTitle";
import { APPOINTMENT_KEY, createAppointment } from "@services/queries/Appointment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function NewAppointment() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createAppointmentMutation = useMutation({
    mutationFn: (data: AppointmentFormData) => createAppointment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [APPOINTMENT_KEY] });
      toast.success("Agendamento criado com sucesso!");
      router.push("/dashboard/appointments");
    },
    onError: (err) => {
      toast.error("Ops. Ocorreu um problema ao tentar criar o agendamento.");
    },
  });

  async function handleCreateAppointment(data: AppointmentFormData) {
    // createAppointmentMutation.mutate(data);
    console.log("mutate");
  }

  return (
    <div>
      <PageTitle renderBackOption title="Novo agendamento" />

      <AppointmentForm isLoading={createAppointmentMutation.isLoading} onSubmit={handleCreateAppointment} />
    </div>
  );
}
