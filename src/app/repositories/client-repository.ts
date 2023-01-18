import { Client } from "@app/entities/client";

export abstract class ClientRepository {
  abstract create(client: Client): Promise<void>
  abstract findMany(): Promise<Client[]>
}