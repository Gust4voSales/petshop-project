import { Customer } from "@app/entities/customer";

export class CustomerViewModel {
  static toHTTP(customer: Customer) {
    return {
      id: customer.id,
      name: customer.name,
      phone: customer.phone,
    }
  }
}