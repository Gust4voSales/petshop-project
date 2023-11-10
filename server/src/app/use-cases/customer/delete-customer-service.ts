import { Injectable } from "@nestjs/common";
import { CustomerRepository } from "@app/repositories/customer-repository";
import { EntityNotFound } from "../errors/entity-not-found";
import { AppointmentRepository } from "@app/repositories/appointment-repository";
import { InvalidDeleteOperation } from "../errors/invalid-delete-operation";

@Injectable()
export class DeleteCustomerService {
  constructor(private customerRepository: CustomerRepository, private appointmentRepository: AppointmentRepository) { }

  async execute(id: string) {
    const customer = await this.customerRepository.findById(id)
    if (!customer) throw new EntityNotFound("Customer", id)

    const customerAppointments = await this.appointmentRepository.countByCustomerId(id)
    if (customerAppointments > 0) throw new InvalidDeleteOperation(`Customer with ${id} has appointments.`)

    return await this.customerRepository.deleteById(id)
  }

}