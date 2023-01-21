import { Injectable } from '@nestjs/common'
import { Appointment } from "@app/entities/appointment"
import { AppointmentRepository } from "@app/repositories/appointment-repository"
import { PetshopServiceRepository } from '@app/repositories/petshop-service-repository'

interface ScheduleAppointmentRequest {
  customerId: string
  petId: string
  serviceId: string
  appointmentTime: Date
}

@Injectable()
export class ScheduleAppointmentService {
  constructor(private appointmentRepository: AppointmentRepository) { }

  async execute(request: ScheduleAppointmentRequest) {
    // check if time is available 

    const appointment = new Appointment(request)

    // schedule the appointment
    await this.appointmentRepository.create(appointment)

    return {
      appointment
    }
  }
}