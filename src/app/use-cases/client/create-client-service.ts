import { Client } from "@app/entities/client";
import { Pet } from "@app/entities/pet";
import { ClientRepository } from "@app/repositories/client-repository";
import { Injectable } from "@nestjs/common";

interface CreateClientRequest {
  name: string
  phone: string
  pets?: Pet[]
}

@Injectable()
export class CreateClientService {
  constructor(private clientRepository: ClientRepository) { }

  async execute(request: CreateClientRequest) {
    const { name, phone, pets = [] } = request

    const client = new Client({ name, phone, pets })

    await this.clientRepository.create(client)

    return {
      client
    }

  }
}