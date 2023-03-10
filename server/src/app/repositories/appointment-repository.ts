import { Appointment } from "@app/entities/appointment";

export interface FindManyAppointmentsQuery {
  startDate: Date
  endDate: Date
}

export abstract class AppointmentRepository {
  abstract create(appointment: Appointment): Promise<void>;
  abstract findById(id: string): Promise<Appointment | null>;
  abstract findMany(query?: FindManyAppointmentsQuery): Promise<Appointment[]>;
  abstract delete(id: string): Promise<void>
}