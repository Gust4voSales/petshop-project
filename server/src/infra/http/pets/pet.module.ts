import { Module } from "@nestjs/common";
import { DatabaseModule } from "@infra/database/database.module";
import { PetsController } from "./pets.controller";
import { AddPetService } from "@app/use-cases/pets/add-pet-service";
import { ListCustomerPetsService } from "@app/use-cases/pets/list-customer-pets-service";

@Module({
  imports: [DatabaseModule],
  controllers: [PetsController],
  providers: [AddPetService, ListCustomerPetsService],
})
export class PetModule { }