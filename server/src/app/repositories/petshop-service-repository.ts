import { PetshopService } from "@app/entities/petshop-service";

export abstract class PetshopServiceRepository {
  abstract create(petshopService: PetshopService): Promise<void>;
  abstract save(petshopService: PetshopService): Promise<void>;
  abstract findById(id: string): Promise<PetshopService | null>;
  abstract findMany(): Promise<PetshopService[]>;
  abstract deleteById(id: string): Promise<void>;
}