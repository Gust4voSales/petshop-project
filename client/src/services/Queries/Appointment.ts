import { AppointmentFormData } from '@components/appointments/AppointmentForm'
import api from '../api'

export const APPOINTMENT_KEY = 'appointment-fetch'

export async function createAppointment(appointment: AppointmentFormData) {
  return await api.post("/appointments", {
    ...appointment
  })
}
