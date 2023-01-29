import { Customer } from "@app/entities/customer";
import { CustomerRepository } from "@app/repositories/customer-repository";
import { Injectable } from "@nestjs/common";
import { CustomerMapper } from "../mappers/customer-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaCustomerRepository implements CustomerRepository {
  constructor(private prismaService: PrismaService) { }

  async create(customer: Customer) {
    await this.prismaService.customer.create({
      data: {
        id: customer.id,
        name: customer.name,
        phone: customer.phone,
      }
    })
  }

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

}