import { Pet } from "@app/entities/pet";
import { PetRepository } from "@app/repositories/pet-repository";
import { Injectable } from "@nestjs/common";
import { PetMapper } from "../mappers/pet-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaPetRepository implements PetRepository {
  constructor(private prismaService: PrismaService) { }

  async create(pet: Pet): Promise<void> {
    await this.prismaService.pet.create({
      data: PetMapper.toPrisma(pet)
    })
  }

  async findManyByOwnerId(id: string): Promise<Pet[]> {
    const pets = await this.prismaService.pet.findMany({
      where: {
        ownerId: id
      }
    })

    return pets.map(PetMapper.toDomain)
  }
}