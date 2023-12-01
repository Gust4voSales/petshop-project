import { AppointmentStatus } from "@app/entities/appointment"
import { SortByAppointmentsOptions, sortByAppointmentsOptions } from "@app/repositories/appointment-repository"
import { PaginateSortQuery } from "@infra/http/dtos/paginate-sort-query"
import { Type } from "class-transformer"
import { IsDate, IsDefined, IsEnum, IsIn, IsOptional, ValidateIf } from "class-validator"


export class ListAppointmentsQuery extends PaginateSortQuery {
  @ValidateIf(o => o.endDate) // only validate if endDate is also passed
  @IsDefined()
  @IsDate()
  @Type(() => Date)
  startDate: Date

  @ValidateIf(o => o.startDate) // only validate if startDate is also passed
  @IsDefined()
  @IsDate()
  @Type(() => Date)
  endDate: Date

  @IsOptional()
  @IsEnum(AppointmentStatus)
  status?: AppointmentStatus

  @IsOptional()
  @IsIn(sortByAppointmentsOptions)
  sortBy: SortByAppointmentsOptions
}
