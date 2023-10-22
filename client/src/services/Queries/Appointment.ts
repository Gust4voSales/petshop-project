import { AppointmentFormData } from '@components/appointments/AppointmentForm'
import api from '../api'
import { Appointment } from '@@types/Appointment'

export const APPOINTMENT_KEY = 'appointment-fetch'


type FetchAppointmentsParams = {
  startDate: string
  endDate: string
}
export async function fetchAppointments({ startDate, endDate }: FetchAppointmentsParams) {
  const { data } = await api.get<{ appointments: Appointment[] }>("/appointments", {
    params: {
      startDate, endDate
    }
  })
  return data
}

export async function createAppointment(appointment: AppointmentFormData) {
  return await api.post("/appointments", {
    ...appointment
  })
}
