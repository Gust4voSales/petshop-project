import { Client } from "@app/entities/client";

export abstract class ClientRepository {
  abstract create(client: Client): Promise<void>
  abstract findById(id: string): Promise<Client | null>
  abstract findMany(): Promise<Client[]>
}