import { Module } from "@nestjs/common";
import { CustomerRepository } from "@app/repositories/customer-repository";
import { PetRepository } from "@app/repositories/pet-repository";
import { PetshopServiceRepository } from "@app/repositories/petshop-service-repository";
import { InMemoryCustomerRepository } from "./InMemoryDB/in-memory-customer-repository";
import { InMemoryPetRepository } from "./InMemoryDB/in-memory-pet-repository";
import { InMemoryPetshopServiceRepository } from "./InMemoryDB/in-memory-petshop-service-repository";
import { AppointmentRepository } from "@app/repositories/appointment-repository";
import { InMemoryAppointmentRepository } from "./InMemoryDB/in-memory-appointment-repository";

@Module({
  providers: [
    {
      provide: PetshopServiceRepository,
      useClass: InMemoryPetshopServiceRepository,
    },
    {
      provide: CustomerRepository,
      useClass: InMemoryCustomerRepository,
    },
    {
      provide: PetRepository,
      useClass: InMemoryPetRepository,
    },
    {
      provide: AppointmentRepository,
      useClass: InMemoryAppointmentRepository,
    },
  ],
  exports: [PetshopServiceRepository, CustomerRepository, PetRepository, AppointmentRepository]
})
export class DatabaseModule { }