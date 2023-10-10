import { Customer, CustomerPet } from "@app/entities/customer";
import { CustomerRepository } from "@app/repositories/customer-repository";
import { Injectable } from "@nestjs/common";

interface CreateCustomerRequest {
  name: string
  phone: string
  pets?: CustomerPet[]
}

@Injectable()
export class CreateCustomerService {
  constructor(private customerRepository: CustomerRepository) { }

  async execute(request: CreateCustomerRequest) {
    const { name, phone, pets = [] } = request

    const customer = new Customer({ name, phone, pets })

    await this.customerRepository.create(customer)

    return {
      customer
    }

  }
}