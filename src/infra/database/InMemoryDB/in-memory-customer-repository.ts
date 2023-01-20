import { Customer } from "@app/entities/customer";
import { CustomerRepository } from "@app/repositories/customer-repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class InMemoryCustomerRepository implements CustomerRepository {
  public customers: Customer[] = []

  async create(customer: Customer) {
    this.customers.push(customer)
  }

  async findById(id: string): Promise<Customer | null> {
    const customer = this.customers.find(customer => customer.id === id)

    return customer ?? null
  }

  async findMany(): Promise<Customer[]> {
    return this.customers
  }

}