import { Module } from "@nestjs/common";
import { CreatePetshopService } from "@app/use-cases/petshop-service/create-petshop-service";
import { ListPetshopServices } from "@app/use-cases/petshop-service/list-petshop-services";
import { ShowPetshopService } from "@app/use-cases/petshop-service/show-petshop-service";
import { DatabaseModule } from "@infra/database/database.module";
import { PetshopServicesController } from "./petshop-services.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [PetshopServicesController],
  providers: [CreatePetshopService, ListPetshopServices, ShowPetshopService],
})
export class PetshopServiceModule { }