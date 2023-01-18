import { Module } from "@nestjs/common";
import { DatabaseModule } from "@infra/database/database.module";
import { PetsController } from "./pets.controller";
import { AddPetService } from "@app/use-cases/pets/add-pet-service";
import { ListClientPetsService } from "@app/use-cases/pets/list-client-pets-service";

@Module({
  imports: [DatabaseModule],
  controllers: [PetsController],
  providers: [AddPetService, ListClientPetsService],
})
export class PetModule { }