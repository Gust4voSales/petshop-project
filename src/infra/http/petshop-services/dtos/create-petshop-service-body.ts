import { Length, Max, Min, IsInt } from "class-validator"

export class CreatePetshopServiceBody {
  @Length(1, 60)
  title: string

  @Length(1, 120)
  description: string

  @Min(1)
  @Max(100_000_000) //100_000_000_000_000 in cents --> R$ 100_000_000_000 
  @IsInt()
  value: number
}