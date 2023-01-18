import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreatePetshopService } from "@app/use-cases/petshop-service/create-petshop-service";
import { ListPetshopServices } from "@app/use-cases/petshop-service/list-petshop-services";
import { PetshopServiceViewModel } from "./petshop-service-view-model";
import { CreatePetshopServiceBody } from "./dtos/create-petshop-service-body";

@Controller("services")
export class PetshopServicesController {
  constructor(
    private listPetshopServices: ListPetshopServices,
    private createPetshopService: CreatePetshopService,
  ) { }

  @Get()
  async list() {
    const { petshopServices } = await this.listPetshopServices.execute()

    return { services: petshopServices.map(PetshopServiceViewModel.toHTTP) }
  }

  @Post()
  async create(@Body() body: CreatePetshopServiceBody) {
    const { petshopService } = await this.createPetshopService.execute(body)

    return { service: PetshopServiceViewModel.toHTTP(petshopService) }
  }
} 