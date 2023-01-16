import { CreatePetshopService } from "@app/use-cases/petshop-service/create-petshop-service";
import { ListPetshopServices } from "@app/use-cases/petshop-service/list-petshop-services";
import { Body, Controller, Get, Post } from "@nestjs/common";

@Controller("services")
export class PetshopServicesController {
  constructor(
    private listPetshopServices: ListPetshopServices,
    private createPetshopService: CreatePetshopService,
  ) { }

  @Get()
  async list() {
    const { petshopServices: services } = await this.listPetshopServices.execute()

    return { services }
  }

  @Post()
  async create(@Body() body: any) {
    const { petshopService } = await this.createPetshopService.execute(body)

    return { service: petshopService }
  }
} 