import { Pet } from "@app/entities/pet"
import { Pet as RawPet } from '@prisma/client'

export class PetMapper {
  static toPrisma(pet: Pet) {
    return {
      id: pet.id,
      name: pet.name,
      breed: pet.breed,
      age: pet.age,
      ownerId: pet.ownerId
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