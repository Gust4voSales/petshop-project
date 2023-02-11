import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CreatePetshopService } from "@app/use-cases/petshop-service/create-petshop-service";
import { ListPetshopServices } from "@app/use-cases/petshop-service/list-petshop-services";
import { PetshopServiceViewModel } from "../view-models/petshop-service-view-model";
import { CreatePetshopServiceBody } from "./dtos/create-petshop-service-body";
import { ShowPetshopService } from "@app/use-cases/petshop-service/show-petshop-service";
import { EditPetshopService } from "@app/use-cases/petshop-service/edit-petshop-service";
import { UpdatePetshopServiceBody } from "./dtos/update-petshop-service-body";

@Controller("services")
export class PetshopServicesController {
  constructor(
    private listPetshopServices: ListPetshopServices,
    private createPetshopService: CreatePetshopService,
    private showPetshopService: ShowPetshopService,
    private editPetshopService: EditPetshopService,
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

  @Get(":id")
  async show(@Param("id") id: string) {
    const { petshopService } = await this.showPetshopService.execute(id)

    return { service: PetshopServiceViewModel.toHTTP(petshopService) }
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() body: UpdatePetshopServiceBody) {
    const { petshopService } = await this.editPetshopService.execute({ id, body })

    return { service: PetshopServiceViewModel.toHTTP(petshopService) }
  }
} 