import { Controller, Body, Post, Get, Param, ValidationPipe, Delete, Put } from "@nestjs/common"
import { AddPetService } from "@app/use-cases/pets/add-pet-service"
import { ListCustomerPetsService } from "@app/use-cases/pets/list-customer-pets-service"
import { PetViewModel } from "../view-models/pet-view-model"
import { CreatePetBody, UpdatePetBody } from "./dtos/pet-body"
import { DeletePetService } from "@app/use-cases/pets/delete-pet-service"
import { EditPetService } from "@app/use-cases/pets/edit-pet-service"

@Controller("pets")
export class PetsController {
  constructor(private addPetService: AddPetService, private editPetService: EditPetService, private listCustomerPetsService: ListCustomerPetsService, private deletePetService: DeletePetService) { }

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

  @Put('/:id')
  async update(@Param("id") id: string, @Body() body: UpdatePetBody) {
    const { pet } = await this.editPetService.execute({ id, body })

    return { pet: PetViewModel.toHTTP(pet) }
  }

  @Delete('/:id')
  async destroy(@Param("id") id: string) {
    await this.deletePetService.execute(id)
  }
} 