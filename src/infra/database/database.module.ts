import { PetshopServiceRepository } from "@app/repositories/petshop-service-repository";
import { Module } from "@nestjs/common";
import { InMemoryPetshopServiceRepository } from "./InMemoryDB/in-memory-petshop-service-repository";

@Module({
  providers: [
    {
      provide: PetshopServiceRepository,
      useClass: InMemoryPetshopServiceRepository,
    },
  ],
  exports: [PetshopServiceRepository]
})
export class DatabaseModule { }