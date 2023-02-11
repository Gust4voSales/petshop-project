import { PetshopServiceRepository } from '@app/repositories/petshop-service-repository';
import { Injectable } from '@nestjs/common'
import { EntityNotFound } from '../errors/entity-not-found';

@Injectable()
export class DeletePetshopService {
  constructor(private petshopServiceRepository: PetshopServiceRepository) { }

  async execute(id: string) {
    const petshopService = await this.petshopServiceRepository.findById(id)

    if (!petshopService) {
      throw new EntityNotFound("Service", id)
    }

    // check Appoitments schema --> the referencial action when Services are deleted is: SetNull
    await this.petshopServiceRepository.deleteById(id)
  }
}