import { Appointment, AppointmentStatus } from "@app/entities/appointment";
import { Prisma, AppointmentStatus as RawAppointmentStatus } from "@prisma/client";
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
      appointmentTime: appointment.appointmentTime,
      status: appointment.status as RawAppointmentStatus,
    }
  }

  static toDomain(raw: RawAppointmentWithPetsAndService) {
    return new Appointment({
      petId: raw.petId,
      serviceId: raw.serviceId,
      appointmentTime: raw.appointmentTime,
      pet: PetMapper.toDomain(raw.pet),
      service: PetshopServiceMapper.toDomain(raw.service),
      status: raw.status as AppointmentStatus
    }, raw.id)
  }
}