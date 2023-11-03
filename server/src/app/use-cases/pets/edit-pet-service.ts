import { PetRepository } from "@app/repositories/pet-repository";
import { Injectable } from "@nestjs/common";
import { EntityNotFound } from "../errors/entity-not-found";

interface EditPetRequest {
  id: string
  body: {
    name: string
    age: number
    breed: string
  }
}

@Injectable()
export class EditPetService {
  constructor(private petRepository: PetRepository) { }

  async execute(request: EditPetRequest) {
    const pet = await this.petRepository.findById(request.id)
    if (!pet) throw new EntityNotFound("Pet", request.id)

    const { name, age, breed } = request.body
    pet.name = name
    pet.age = age
    pet.breed = breed

    await this.petRepository.save(pet)

    return { pet }
  }
}