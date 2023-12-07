import { Length, Max, Min, IsInt } from "class-validator"

export class CreatePetshopServiceBody {
  @Length(1, 60)
  title: string

  @Length(1, 120)
  description: string

  @Min(1)
  @Max(1_000_000_000) // max of 1_000_000_000 in cents --> R$ 1_000_000
  @IsInt()
  value: number

  @Min(1)
  @Max(24 * 60 * 60) // MAX of 86400 seconds --> 24h * 60min * 60s
  @IsInt()
  duration: number
}