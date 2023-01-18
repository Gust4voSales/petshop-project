import { Client } from "@app/entities/client";
import { ClientRepository } from "@app/repositories/client-repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListClientsService {
  constructor(private clientRepository: ClientRepository) { }

  async execute() {
    const clients = await this.clientRepository.findMany()

    return {
      clients
    }

  }
}