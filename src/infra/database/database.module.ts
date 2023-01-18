import { ClientRepository } from "@app/repositories/client-repository";
import { PetRepository } from "@app/repositories/pet-repository";
import { PetshopServiceRepository } from "@app/repositories/petshop-service-repository";
import { Module } from "@nestjs/common";
import { InMemoryClientRepository } from "./InMemoryDB/in-memory-client-repository";
import { InMemoryPetRepository } from "./InMemoryDB/in-memory-pet-repository";
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
    {
      provide: PetRepository,
      useClass: InMemoryPetRepository,
    },
  ],
  exports: [PetshopServiceRepository, ClientRepository, PetRepository]
})
export class DatabaseModule { }