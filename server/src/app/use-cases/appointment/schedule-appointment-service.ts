import { Injectable } from '@nestjs/common'
import { Appointment } from "@app/entities/appointment"
import { AppointmentRepository } from "@app/repositories/appointment-repository"
import { PetRepository } from '@app/repositories/pet-repository'
import { EntityNotFound } from '../errors/entity-not-found'
import { PetshopServiceRepository } from '@app/repositories/petshop-service-repository'

interface ScheduleAppointmentRequest {
  petId: string
  serviceId: string
  appointmentTime: Date
}

@Injectable()
export class ScheduleAppointmentService {
  constructor(private appointmentRepository: AppointmentRepository, private petRepository: PetRepository, private petshopServiceRepository: PetshopServiceRepository) { }

  async execute(request: ScheduleAppointmentRequest) {
    const pet = await this.petRepository.findById(request.petId)
    if (!pet) throw new EntityNotFound("Pet", request.petId)

    const service = await this.petshopServiceRepository.findById(request.serviceId)
    if (!service) throw new EntityNotFound("Service", request.serviceId)

    const appointment = new Appointment(request)

    // schedule the appointment
    await this.appointmentRepository.create(appointment)

    return {
      appointment
    }
  }
}