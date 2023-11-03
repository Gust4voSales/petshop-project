import { CustomerPet } from "@app/entities/customer"
import { CreateCustomerPetBody } from "@infra/http/pets/dtos/pet-body"
import { Type } from "class-transformer"
import { Length, IsOptional, ValidateNested, } from "class-validator"


export class CreateCustomerBody {
  @Length(3, 60)
  name: string

  @Length(8, 60)
  phone: string

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateCustomerPetBody)
  pets?: CustomerPet[]
}