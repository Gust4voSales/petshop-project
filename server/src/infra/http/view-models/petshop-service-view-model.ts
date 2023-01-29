import { PetshopService } from "@app/entities/petshop-service";

export class PetshopServiceViewModel {
  static toHTTP(petshopService: PetshopService) {
    return {
      id: petshopService.id,
      title: petshopService.title,
      description: petshopService.description,
      value: petshopService.value,
      duration: petshopService.duration,
    }
  }
}