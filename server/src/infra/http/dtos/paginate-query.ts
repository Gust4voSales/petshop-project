import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginateQuery {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page?: number

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  pageSize?: number
}