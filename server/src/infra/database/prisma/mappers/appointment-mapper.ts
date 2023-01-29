import { Appointment } from "@app/entities/appointment";
import { Appointment as RawAppointment } from "@prisma/client";

export class AppointmentMapper {
  static toPrisma(appointment: Appointment) {
    return {
      id: appointment.id,
      petId: appointment.petId,
      serviceId: appointment.serviceId,
      appointmentTime: appointment.appointmentTime
    }
  }

  static toDomain(raw: RawAppointment) {
    return new Appointment({
      petId: raw.petId,
      serviceId: raw.serviceId,
      appointmentTime: raw.appointmentTime,
    }, raw.id)
  }
}