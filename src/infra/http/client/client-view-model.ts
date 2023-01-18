import { Client } from "@app/entities/client";

export class ClientViewModel {
  static toHTTP(client: Client) {
    return {
      id: client.id,
      name: client.name,
      phone: client.phone,
      pets: client.pets,
    }
  }
}