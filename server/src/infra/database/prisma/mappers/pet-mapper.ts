import { Pet } from "@app/entities/pet"
import { Pet as RawPet } from '@prisma/client'

export class PetMapper {
  static toPrisma(pet: Pet, includeOwnerId: boolean | undefined = true) {
    return {
      id: pet.id,
      name: pet.name,
      breed: pet.breed,
      age: pet.age,
      ownerId: includeOwnerId ? pet.ownerId : undefined
    }
  }

  static toDomain(raw: RawPet) {
    return new Pet({
      name: raw.name,
      breed: raw.breed,
      age: raw.age,
      ownerId: raw.ownerId
    }, raw.id)
  }
}