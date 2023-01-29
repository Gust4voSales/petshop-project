import { PetshopService } from "@app/entities/petshop-service";
import { PetshopService as RawPetshopService } from "@prisma/client";

export class PetshopServiceMapper {
  static toPrisma(petshopService: PetshopService) {
    return {
      id: petshopService.id,
      title: petshopService.title,
      description: petshopService.description,
      duration: petshopService.duration,
      value: petshopService.value,
    }
  }

  static toDomain(raw: RawPetshopService) {
    return new PetshopService({
      title: raw.title,
      description: raw.description,
      duration: raw.duration,
      value: raw.value,
    }, raw.id)
  }
}