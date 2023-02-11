import { Injectable } from '@nestjs/common'
import { PetshopServiceRepository } from "@app/repositories/petshop-service-repository";
import { EntityNotFound } from "../errors/entity-not-found";


interface EditPetshopServiceRequest {
  id: string
  body: {
    title: string
    description: string
    value: number
    duration: number
  }
}

@Injectable()
export class EditPetshopService {
  constructor(private petshopServiceRepository: PetshopServiceRepository) { }

  async execute(request: EditPetshopServiceRequest) {
    const petshopService = await this.petshopServiceRepository.findById(request.id)

    if (!petshopService) {
      throw new EntityNotFound("Service", request.id)
    }
    const body = request.body

    petshopService.title = body.title
    petshopService.description = body.description
    petshopService.duration = body.duration
    petshopService.value = body.value

    await this.petshopServiceRepository.save(petshopService)

    return {
      petshopService
    }
  }
}