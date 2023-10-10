import { Customer } from "@app/entities/customer";
import { CustomerRepository } from "@app/repositories/customer-repository";
import { Injectable } from "@nestjs/common";
import { CustomerMapper } from "../mappers/customer-mapper";
import { PrismaService } from "../prisma.service";
import { PetMapper } from "../mappers/pet-mapper";

@Injectable()
export class PrismaCustomerRepository implements CustomerRepository {
  constructor(private prismaService: PrismaService) { }

  async findById(id: string): Promise<Customer | null> {
    const customer = await this.prismaService.customer.findUnique({
      where: {
        id
      },
      include: { pets: true }
    })

    if (!customer) return null

    return CustomerMapper.toDomain(customer)
  }

  async findMany(): Promise<Customer[]> {
    const customers = await this.prismaService.customer.findMany({ include: { pets: true } })

    return customers.map(CustomerMapper.toDomain)
  }

  async create(customer: Customer) {
    const raw = CustomerMapper.toPrisma(customer)
    const rawCustomerPets = customer.pets.map(p => PetMapper.toPrisma(p, false))

    await this.prismaService.customer.create({
      data: {
        ...raw, pets: {
          createMany: {
            data: rawCustomerPets
          }
        }
      },
    })
  }

  async save(customer: Customer): Promise<void> {
    const raw = CustomerMapper.toPrisma(customer)

    await this.prismaService.customer.update({
      where: {
        id: customer.id
      },
      data: raw
    })
  }

}