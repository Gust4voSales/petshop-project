import { AppointmentRepository, FindManyAppointmentsQuery } from "@app/repositories/appointment-repository";
import { Injectable } from "@nestjs/common";


@Injectable()
export class ListAppointmentsService {
  constructor(private appointmentRepository: AppointmentRepository) { }

  async execute(query: FindManyAppointmentsQuery) {
    const appointments = await this.appointmentRepository.findMany(query)

    return {
      appointments
    }
  }
}