import { Pet } from "@app/entities/pet";

export abstract class PetRepository {
  abstract create(pet: Pet): Promise<void>
  abstract save(pet: Pet): Promise<void>
  abstract findById(id: string): Promise<Pet | null>
  abstract findManyByOwnerId(id: string): Promise<Pet[]>
  abstract deleteById(id: string): Promise<void>
}