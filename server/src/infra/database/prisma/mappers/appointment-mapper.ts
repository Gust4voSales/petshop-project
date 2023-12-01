import { Appointment, AppointmentStatus } from "@app/entities/appointment";
import { AppointmentStatus as RawAppointmentStatus } from "@prisma/client";
import { PetMapper } from "./pet-mapper";
import { PetshopServiceMapper } from "./petshop-service-mapper";
import { RawAppointmentWithPetsAndService } from "../types";

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
      serviceId: raw.serviceId ?? '',
      appointmentTime: raw.appointmentTime,
      pet: PetMapper.toDomain(raw.pet),
      service: raw.service ? PetshopServiceMapper.toDomain(raw.service) : undefined,
      status: raw.status as AppointmentStatus
    }, raw.id)
  }
}