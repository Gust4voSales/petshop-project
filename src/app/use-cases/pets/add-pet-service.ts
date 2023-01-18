import { Pet } from "@app/entities/pet";
import { ClientRepository } from "@app/repositories/client-repository";
import { PetRepository } from "@app/repositories/pet-repository";
import { Injectable } from "@nestjs/common";
import { ClientNotFound } from "../errors/client-not-found";

interface AddPetRequest {
  name: string
  age: number
  breed: string

  ownerId: string
}

@Injectable()
export class AddPetService {
  constructor(private petRepository: PetRepository, private clientRepository: ClientRepository) { }

  async execute(request: AddPetRequest) {
    const { name,
      age,
      breed,
      ownerId } = request

    const client = await this.clientRepository.findById(ownerId)

    if (!client) {
      throw new ClientNotFound(ownerId)
    }

    const pet = new Pet({
      name,
      age,
      breed,
      ownerId
    })

    await this.petRepository.create(pet)

    return {
      pet
    }

  }
}