import { Type } from "class-transformer"
import { IsDate, IsDefined, ValidateIf } from "class-validator"

export class ListAppointmentsQuery {
  @ValidateIf(o => o.endDate) // only validate if both date properties are passed  
  @IsDefined()
  @IsDate()
  @Type(() => Date)
  startDate: Date

  @ValidateIf(o => o.startDate) // only validate if both date properties are passed 
  @IsDefined()
  @IsDate()
  @Type(() => Date)
  endDate: Date
}