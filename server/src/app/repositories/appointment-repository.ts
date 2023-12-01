import { Appointment, AppointmentStatus } from "@app/entities/appointment";
import { PaginateOptions, PaginatedResult } from "./utils/pagination";
import { SortOptions } from "./utils/sort";

export const sortByAppointmentsOptions = ['appointmentTime', 'status'] as const
export type SortByAppointmentsOptions = typeof sortByAppointmentsOptions[number]

export interface FindManyAppointmentsQueryPaginatedSorted
  extends PaginateOptions, SortOptions<SortByAppointmentsOptions> {
  startDate?: Date
  endDate?: Date
  status?: AppointmentStatus
}

export abstract class AppointmentRepository {
  abstract create(appointment: Appointment): Promise<void>;
  abstract save(appointment: Appointment): Promise<void>
  abstract findById(id: string): Promise<Appointment | null>;
  abstract findManyPaginated(query: FindManyAppointmentsQueryPaginatedSorted): Promise<PaginatedResult<Appointment>>;
  abstract delete(id: string): Promise<void>
  abstract countByPetId(id: string): Promise<number>
  abstract countByCustomerId(id: string): Promise<number>
}