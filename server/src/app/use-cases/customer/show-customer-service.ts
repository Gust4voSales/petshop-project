import { CustomerRepository } from "@app/repositories/customer-repository";
import { Injectable } from "@nestjs/common";
import { EntityNotFound } from "../errors/entity-not-found";

@Injectable()
export class ShowCustomerService {
  constructor(private customerRepository: CustomerRepository) { }

  async execute(id: string) {
    const customer = await this.customerRepository.findById(id)

    if (!customer) {
      throw new EntityNotFound("Customer", id)
    }

    return {
      customer
    }

  }
}