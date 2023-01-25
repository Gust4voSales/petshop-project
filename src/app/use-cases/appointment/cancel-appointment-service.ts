import { Injectable } from '@nestjs/common'
import { AppointmentRepository } from '@app/repositories/appointment-repository';
import { EntityNotFound } from '../errors/entity-not-found';

@Injectable()
export class CancelAppointmentService {
  constructor(private appointmentRepository: AppointmentRepository) { }

  async execute(id: string) {
    const appointment = await this.appointmentRepository.findById(id)

    if (!appointment) throw new EntityNotFound("Appointment", id)

    await this.appointmentRepository.delete(id)
  }
}