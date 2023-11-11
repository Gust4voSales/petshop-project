import { Injectable } from "@nestjs/common";
import { AppointmentRepository } from "@app/repositories/appointment-repository";
import { AppointmentStatus } from "@app/entities/appointment";
import { EntityNotFound } from "../errors/entity-not-found";

type UpdateStatusRequest = {
  id: string
  status: AppointmentStatus
}

@Injectable()
export class UpdateAppointmentStatusService {
  constructor(private appointmentRepository: AppointmentRepository) { }

  async execute(request: UpdateStatusRequest) {
    const appointment = await this.appointmentRepository.findById(request.id)

    if (!appointment) {
      throw new EntityNotFound("Appointment", request.id)
    }

    appointment.status = request.status

    await this.appointmentRepository.save(appointment)

    return { appointment }
  }
}