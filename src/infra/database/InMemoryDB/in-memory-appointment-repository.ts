import { Appointment } from "@app/entities/appointment";
import { AppointmentRepository, FindManyAppointmentsQuery } from "@app/repositories/appointment-repository";
import { Injectable } from "@nestjs/common";
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween) // use plugin

@Injectable()
export class InMemoryAppointmentRepository implements AppointmentRepository {
  public appointments: Appointment[] = []

  async create(appointment: Appointment) {
    this.appointments.push(appointment)
  }

  async findMany(query?: FindManyAppointmentsQuery) {
    let appointments: Appointment[] = []

    if (query) {
      appointments = this.appointments.filter(appointment =>
        dayjs(appointment.appointmentTime).isBetween(query.startDate, query.endDate, 'day', '[]'))
    } else {
      appointments = this.appointments
    }

    return appointments
  }
}