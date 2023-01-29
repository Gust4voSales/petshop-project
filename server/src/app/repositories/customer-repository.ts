import { Customer } from "@app/entities/customer";

export abstract class CustomerRepository {
  abstract create(customer: Customer): Promise<void>
  abstract findById(id: string): Promise<Customer | null>
  abstract findMany(): Promise<Customer[]>
}