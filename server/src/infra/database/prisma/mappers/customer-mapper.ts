import { Customer } from "@app/entities/customer"
import { Prisma } from "@prisma/client"
import { PetMapper } from "./pet-mapper"

type RawCustomerWithPets = Prisma.CustomerGetPayload<{
  include: { pets: true }
}>


export class CustomerMapper {
  static toPrisma(customer: Customer) {
    return {
      id: customer.id,
      name: customer.name,
      phone: customer.phone,
    }
  }

  static toDomain(raw: RawCustomerWithPets) {
    return new Customer({
      name: raw.name,
      phone: raw.phone,
      pets: raw.pets.map(PetMapper.toDomain),
    }, raw.id)
  }
}