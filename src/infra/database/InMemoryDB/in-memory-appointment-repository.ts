import { Appointment } from "@app/entities/appointment";
import { AppointmentRepository } from "@app/repositories/appointment-repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class InMemoryAppointmentRepository implements AppointmentRepository {
  public appointments: Appointment[] = []

  async create(appointment: Appointment) {
    this.appointments.push(appointment)
  }
}