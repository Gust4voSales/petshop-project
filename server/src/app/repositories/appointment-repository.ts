import { Appointment, AppointmentStatus } from "@app/entities/appointment";
import { PaginateOptions, PaginatedResult } from "./utils/pagination";

export interface FindManyAppointmentsQueryPaginated extends PaginateOptions {
  startDate?: Date
  endDate?: Date
  status?: AppointmentStatus
}

export abstract class AppointmentRepository {
  abstract create(appointment: Appointment): Promise<void>;
  abstract save(appointment: Appointment): Promise<void>
  abstract findById(id: string): Promise<Appointment | null>;
  abstract findManyPaginated(query: FindManyAppointmentsQueryPaginated): Promise<PaginatedResult<Appointment>>;
  abstract delete(id: string): Promise<void>
  abstract countByPetId(id: string): Promise<number>
  abstract countByCustomerId(id: string): Promise<number>
}