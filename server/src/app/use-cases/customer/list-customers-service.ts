import { CustomerRepository } from "@app/repositories/customer-repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListCustomersService {
  constructor(private customerRepository: CustomerRepository) { }

  async execute() {
    const customers = await this.customerRepository.findMany()

    return {
      customers
    }

  }
}