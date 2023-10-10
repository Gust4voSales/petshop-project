import { Length, IsInt, Min, IsUUID, } from "class-validator"


class PetBodyDTO {
  @Length(3, 60)
  name: string

  @Length(1, 60)
  breed: string

  @IsInt()
  @Min(0)
  age: number
}

export class CreatePetBody extends PetBodyDTO {
  @IsUUID()
  ownerId: string
}

export class CreateCustomerPetBody extends PetBodyDTO {
}
