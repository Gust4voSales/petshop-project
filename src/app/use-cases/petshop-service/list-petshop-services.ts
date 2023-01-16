import { PetshopServiceRepository } from "@app/repositories/petshop-service-repository";
import { Injectable } from "@nestjs/common";


@Injectable()
export class ListPetshopServices {
  constructor(private petshopServiceRepository: PetshopServiceRepository) { }

  async execute() {
    const petshopServices = await this.petshopServiceRepository.findMany()

    return {
      petshopServices
    }
  }
}