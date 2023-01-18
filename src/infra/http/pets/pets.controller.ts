import { Controller, Body, Post, Get, Param } from "@nestjs/common"
import { AddPetService } from "@app/use-cases/pets/add-pet-service"
import { ListClientPetsService } from "@app/use-cases/pets/list-client-pets-service"
import { PetViewModel } from "../view-models/pet-view-model"
import { CreatePetBody } from "./dtos/create-pet-body"

@Controller("pets")
export class PetsController {
  constructor(private addPetService: AddPetService, private listClientPetsService: ListClientPetsService) { }

  @Get("/from/:ownerId")
  async getByOwnerId(@Param("ownerId") ownerId: string) {
    const { pets } = await this.listClientPetsService.execute(ownerId)

    return { pets: pets.map(PetViewModel.toHTTP) }
  }

  @Post()
  async create(@Body() body: CreatePetBody) {
    await this.addPetService.execute(body)
  }
} 