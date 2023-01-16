import { PetshopService } from "@app/entities/petshop-service";
import { PetshopServiceRepository } from "@app/repositories/petshop-service-repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class InMemoryPetshopServiceRepository implements PetshopServiceRepository {
  public petshopServices: PetshopService[] = [];

  async create(petshopService: PetshopService): Promise<void> {
    this.petshopServices.push(petshopService)
  }

  async findMany(): Promise<PetshopService[]> {
    return this.petshopServices
  }

}