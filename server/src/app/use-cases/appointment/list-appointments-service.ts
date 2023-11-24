import { AppointmentRepository, FindManyAppointmentsQueryPaginated } from "@app/repositories/appointment-repository";
import { Injectable } from "@nestjs/common";


@Injectable()
export class ListAppointmentsService {
  constructor(private appointmentRepository: AppointmentRepository) { }

  async execute(query: FindManyAppointmentsQueryPaginated) {
    const paginatedAppointments = await this.appointmentRepository.findManyPaginated(query)

    return {
      appointments: paginatedAppointments.data,
      meta: paginatedAppointments.meta
    }
  }
}