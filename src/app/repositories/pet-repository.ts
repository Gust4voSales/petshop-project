import { Pet } from "@app/entities/pet";

export abstract class PetRepository {
  abstract create(pet: Pet): Promise<void>
  abstract findManyByOwnerId(id: string): Promise<Pet[]>
}