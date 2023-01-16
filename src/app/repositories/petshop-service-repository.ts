import { PetshopService } from "@app/entities/petshop-service";

export abstract class PetshopServiceRepository {
  abstract create(petshopService: PetshopService): Promise<void>;
  abstract findMany(): Promise<PetshopService[]>;
}