import { PetRepository } from "@app/repositories/pet-repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListCustomerPetsService {
  constructor(private petRepository: PetRepository) { }

  async execute(ownerId: string) {
    const pets = await this.petRepository.findManyByOwnerId(ownerId)

    return {
      pets
    }

  }
}