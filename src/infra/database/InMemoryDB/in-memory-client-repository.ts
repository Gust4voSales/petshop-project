import { Client } from "@app/entities/client";
import { ClientRepository } from "@app/repositories/client-repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class InMemoryClientRepository implements ClientRepository {

  public clients: Client[] = []

  async create(client: Client) {
    this.clients.push(client)
  }

  async findMany(): Promise<Client[]> {
    return this.clients
  }
}