import { CustomerRepository } from '@app/repositories/customer-repository';
import { Injectable } from '@nestjs/common'
import { EntityNotFound } from '../errors/entity-not-found';


interface EditCustomerRequest {
  id: string
  body: {
    name: string
    phone: string
  }
}

@Injectable()
export class EditCustomerService {
  constructor(private customerRepository: CustomerRepository) { }

  async execute(request: EditCustomerRequest) {
    const customer = await this.customerRepository.findById(request.id)

    if (!customer) {
      throw new EntityNotFound("Customer", request.id)
    }
    const body = request.body

    customer.name = body.name
    customer.phone = body.phone

    await this.customerRepository.save(customer)

    return {
      customer
    }
  }
}