import { Pet } from "@app/entities/pet";

export class PetViewModel {
  static toHTTP(pet: Pet) {
    return {
      id: pet.id,
      name: pet.name,
      breed: pet.breed,
      age: pet.age,
      ownerId: pet.ownerId,
    }
  }
}