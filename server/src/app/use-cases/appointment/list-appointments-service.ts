import { AppointmentRepository, FindManyAppointmentsQueryPaginatedSorted } from "@app/repositories/appointment-repository";
import { Injectable } from "@nestjs/common";


@Injectable()
export class ListAppointmentsService {
  constructor(private appointmentRepository: AppointmentRepository) { }

  async execute(query: FindManyAppointmentsQueryPaginatedSorted) {
    const paginatedAppointments = await this.appointmentRepository.findManyPaginated(query)

    return {
      appointments: paginatedAppointments.data,
      meta: paginatedAppointments.meta
    }
  }
}