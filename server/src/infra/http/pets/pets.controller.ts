import { Controller, Body, Post, Get, Param, ValidationPipe, Delete } from "@nestjs/common"
import { AddPetService } from "@app/use-cases/pets/add-pet-service"
import { ListCustomerPetsService } from "@app/use-cases/pets/list-customer-pets-service"
import { PetViewModel } from "../view-models/pet-view-model"
import { CreatePetBody } from "./dtos/create-pet-body"
import { DeletePetService } from "@app/use-cases/pets/delete-pet-service"

@Controller("pets")
export class PetsController {
  constructor(private addPetService: AddPetService, private listCustomerPetsService: ListCustomerPetsService, private deletePetService: DeletePetService) { }

  @Get("/from/:ownerId")
  async getByOwnerId(@Param("ownerId") ownerId: string) {
    const { pets } = await this.listCustomerPetsService.execute(ownerId)

    return { pets: pets.map(PetViewModel.toHTTP) }
  }

  @Post()
  async create(@Body() body: CreatePetBody) {
    const { pet } = await this.addPetService.execute(body)

    return { pet: PetViewModel.toHTTP(pet) }
  }

  @Delete('/:id')
  async destroy(@Param("id") id: string) {
    await this.deletePetService.execute(id)
  }
} 