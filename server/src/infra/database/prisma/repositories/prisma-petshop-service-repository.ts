import { Injectable } from "@nestjs/common";
import { PetshopService } from "@app/entities/petshop-service";
import { PetshopServiceRepository } from "@app/repositories/petshop-service-repository";
import { PetshopServiceMapper } from "../mappers/petshop-service-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaPetshopServiceRepository implements PetshopServiceRepository {
  constructor(private prismaService: PrismaService) { }

  async create(petshopService: PetshopService): Promise<void> {
    const raw = PetshopServiceMapper.toPrisma(petshopService)

    await this.prismaService.petshopService.create({
      data: raw
    })
  }

  async save(petshopService: PetshopService): Promise<void> {
    const raw = PetshopServiceMapper.toPrisma(petshopService)

    await this.prismaService.petshopService.update({
      where: {
        id: petshopService.id
      },
      data: raw
    })
  }

  async findById(id: string): Promise<PetshopService> {
    const service = await this.prismaService.petshopService.findUnique({
      where: {
        id,
      }
    })

    if (!service) return null
    return PetshopServiceMapper.toDomain(service)
  }

  async findMany(): Promise<PetshopService[]> {
    const petshopServices = await this.prismaService.petshopService.findMany()

    return petshopServices.map(PetshopServiceMapper.toDomain)
  }

  async deleteById(id: string): Promise<void> {
    await this.prismaService.petshopService.delete({
      where: {
        id,
      }
    })
  }

}