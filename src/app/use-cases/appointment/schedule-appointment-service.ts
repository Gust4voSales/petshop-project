import { Injectable } from '@nestjs/common'
import { Appointment } from "@app/entities/appointment"
import { AppointmentRepository } from "@app/repositories/appointment-repository"

interface ScheduleAppointmentRequest {
  petId: string
  serviceId: string
  appointmentTime: Date
}

@Injectable()
export class ScheduleAppointmentService {
  constructor(private appointmentRepository: AppointmentRepository) { }

  async execute(request: ScheduleAppointmentRequest) {
    // TODO check if time is available 

    // TODO check if pet exists 

    // TODO check if service exists 

    const appointment = new Appointment(request)

    // schedule the appointment
    await this.appointmentRepository.create(appointment)

    return {
      appointment
    }
  }
}