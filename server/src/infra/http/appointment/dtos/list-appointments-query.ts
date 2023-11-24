import { AppointmentStatus } from "@app/entities/appointment"
import { PaginateQuery } from "@infra/http/dtos/paginate-query"
import { Type } from "class-transformer"
import { IsDate, IsDefined, IsEnum, IsOptional, ValidateIf } from "class-validator"

export class ListAppointmentsQuery extends PaginateQuery {
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
}