import { Appointment } from "@app/entities/appointment";

export class AppointmentViewModel {
  static toHTTP(appointment: Appointment) {
    return {
      id: appointment.id,
      petId: appointment.petId,
      serviceId: appointment.serviceId,
      appointmentTime: appointment.appointmentTime,
    }
  }
}