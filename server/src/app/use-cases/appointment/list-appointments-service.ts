import { AppointmentRepository, FindManyAppointmentsQuery } from "@app/repositories/appointment-repository";
import { Injectable } from "@nestjs/common";


@Injectable()
export class ListAppointmentsService {
  constructor(private appointmentRepository: AppointmentRepository) { }

  async execute(query: FindManyAppointmentsQuery) {
    let findManyQuery: FindManyAppointmentsQuery

    if (query.startDate && query.endDate)
      findManyQuery = query

    const appointments = await this.appointmentRepository.findMany(findManyQuery)

    return {
      appointments
    }
  }
}