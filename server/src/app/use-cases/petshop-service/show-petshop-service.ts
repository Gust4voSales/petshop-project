import { PetshopServiceRepository } from "@app/repositories/petshop-service-repository";
import { Injectable } from "@nestjs/common";
import { EntityNotFound } from "../errors/entity-not-found";

@Injectable()
export class ShowPetshopService {
  constructor(private petshopServiceRepository: PetshopServiceRepository) { }

  async execute(id: string) {
    const petshopService = await this.petshopServiceRepository.findById(id)

    if (!petshopService) {
      throw new EntityNotFound("Service", id)
    }

    return { petshopService }
  }
}