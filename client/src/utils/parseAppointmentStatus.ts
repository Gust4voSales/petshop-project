import { AppointmentStatus } from "@/@types/Appointment";

const parsedAppointmentStatus: Record<AppointmentStatus, string> = {
  PENDING: "Pendente",
  CANCELED: "Cancelado",
  DONE: "Concluído",
}

export const parseAppointmentStatus = (status: AppointmentStatus, { capitalize = true }: { capitalize?: boolean } = {}) => parsedAppointmentStatus[status]