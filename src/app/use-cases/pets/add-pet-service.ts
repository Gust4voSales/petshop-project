import { Pet } from "@app/entities/pet";
import { CustomerRepository } from "@app/repositories/customer-repository";
import { PetRepository } from "@app/repositories/pet-repository";
import { Injectable } from "@nestjs/common";
import { CustomerNotFound } from "../errors/customer-not-found";

interface AddPetRequest {
  name: string
  age: number
  breed: string

  ownerId: string
}

@Injectable()
export class AddPetService {
  constructor(private petRepository: PetRepository, private customerRepository: CustomerRepository) { }

  async execute(request: AddPetRequest) {
    const { name,
      age,
      breed,
      ownerId } = request

    const client = await this.customerRepository.findById(ownerId)

    if (!client) {
      throw new CustomerNotFound(ownerId)
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