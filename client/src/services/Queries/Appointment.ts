import { AppointmentFormData } from '@/components/appointments/AppointmentForm'
import api from '../api'
import { Appointment, AppointmentStatus } from '@/@types/Appointment'
import { PaginatedResponse, PaginationParams, SortingParams } from '@/@types/API'

export const APPOINTMENT_KEY = 'appointment-fetch'


type FetchAppointmentsParams = {
  startDate?: string
  endDate?: string
  status?: AppointmentStatus
} & PaginationParams & SortingParams
export async function fetchAppointments({ startDate, endDate, status, page, pageSize, sortBy, sortOrder }: FetchAppointmentsParams) {
  const { data } = await api.get<{ appointments: Appointment[] } & PaginatedResponse>("/appointments", {
    params: {
      startDate, endDate,
      status, page, pageSize,
      sortBy, sortOrder
    }
  })
  return data
}

export async function fetchAppointment(id: string) {
  const { data } = await api.get<{ appointment: Appointment }>(`/appointments/${id}`)
  return data
}

export async function createAppointment(appointment: AppointmentFormData) {
  return await api.post("/appointments", {
    ...appointment
  })
}

export async function updateAppointmentStatus(id: string, status: AppointmentStatus) {
  const { data } = await api.patch<{ appointment: Appointment }>(`/appointments/${id}`, {
    status
  })
  return data
}
