import { PetshopService } from "@app/entities/petshop-service";
import { PetshopServiceRepository } from "@app/repositories/petshop-service-repository";
import { Injectable } from "@nestjs/common";


interface PetshopServiceRequest {
  title: string
  description: string
  value: number
}

@Injectable()
export class CreatePetshopService {
  constructor(private petshopServiceRepository: PetshopServiceRepository) { }

  async execute(request: PetshopServiceRequest) {
    const { title, description, value } = request

    const petshopService = new PetshopService({ title, description, value })

    await this.petshopServiceRepository.create(petshopService)

    return {
      petshopService
    }
  }
}