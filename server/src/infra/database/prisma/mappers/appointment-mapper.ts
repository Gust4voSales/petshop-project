import { Appointment } from "@app/entities/appointment";
import { Prisma, Appointment as RawAppointment } from "@prisma/client";
import { PetMapper } from "./pet-mapper";
import { PetshopServiceMapper } from "./petshop-service-mapper";

type RawAppointmentWithPetsAndService = Prisma.AppointmentGetPayload<{
  include: { pet: true, service: true }
}>


export class AppointmentMapper {
  static toPrisma(appointment: Appointment) {
    return {
      id: appointment.id,
      petId: appointment.petId,
      serviceId: appointment.serviceId,
      appointmentTime: appointment.appointmentTime
    }
  }

  static toDomain(raw: RawAppointmentWithPetsAndService) {
    return new Appointment({
      petId: raw.petId,
      serviceId: raw.serviceId,
      appointmentTime: raw.appointmentTime,
      pet: PetMapper.toDomain(raw.pet),
      service: PetshopServiceMapper.toDomain(raw.service),
    }, raw.id)
  }
}