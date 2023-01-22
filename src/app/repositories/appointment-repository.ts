import { Appointment } from "@app/entities/appointment";

export interface FindManyAppointmentsQuery {
  startDate: Date
  endDate: Date
}

export abstract class AppointmentRepository {
  abstract create(appointment: Appointment): Promise<void>;
  abstract findMany(query?: FindManyAppointmentsQuery): Promise<Appointment[]>;
}