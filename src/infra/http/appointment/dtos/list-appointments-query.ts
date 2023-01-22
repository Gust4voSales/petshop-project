import { Type } from "class-transformer"
import { IsDate, IsDefined, ValidateIf } from "class-validator"

export class ListAppointmentsQuery {
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
}