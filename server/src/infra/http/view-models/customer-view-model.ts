import { Customer } from "@app/entities/customer";
import { PetViewModel } from "./pet-view-model";

export class CustomerViewModel {
  static toHTTP(customer: Customer) {
    return {
      id: customer.id,
      name: customer.name,
      phone: customer.phone,
      pets: customer.pets.map(PetViewModel.toHTTP)
    }
  }
}