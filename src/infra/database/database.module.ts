import { ClientRepository } from "@app/repositories/client-repository";
import { PetshopServiceRepository } from "@app/repositories/petshop-service-repository";
import { Module } from "@nestjs/common";
import { InMemoryClientRepository } from "./InMemoryDB/in-memory-client-repository";
import { InMemoryPetshopServiceRepository } from "./InMemoryDB/in-memory-petshop-service-repository";

@Module({
  providers: [
    {
      provide: PetshopServiceRepository,
      useClass: InMemoryPetshopServiceRepository,
    },
    {
      provide: ClientRepository,
      useClass: InMemoryClientRepository,
    },
  ],
  exports: [PetshopServiceRepository, ClientRepository]
})
export class DatabaseModule { }