import { Pet } from "@app/entities/pet";
import { PetRepository } from "@app/repositories/pet-repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class InMemoryPetRepository implements PetRepository {
  public pets: Pet[] = []

  async create(Pet: Pet) {
    this.pets.push(Pet)
  }

  async findManyByOwnerId(id: string): Promise<Pet[]> {
    const filteredPets = this.pets.filter(pet => pet.ownerId === id)
    return filteredPets
  }

}