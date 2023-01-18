import { Length, IsInt, Min, IsUUID } from "class-validator"

export class CreatePetBody {
  @Length(3, 60)
  name: string

  @Length(1, 60)
  breed: string

  @IsInt()
  @Min(0)
  age: number

  @IsUUID()
  ownerId: string
}