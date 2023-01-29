import { PetshopService } from "@app/entities/petshop-service";
import { PetshopServiceRepository } from "@app/repositories/petshop-service-repository";
import { Injectable } from "@nestjs/common";


interface PetshopServiceRequest {
  title: string
  description: string
  value: number
  duration: number
}

@Injectable()
export class CreatePetshopService {
  constructor(private petshopServiceRepository: PetshopServiceRepository) { }

  async execute(request: PetshopServiceRequest) {
    const petshopService = new PetshopService(request)

    await this.petshopServiceRepository.create(petshopService)

    return {
      petshopService
    }
  }
}