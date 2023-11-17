import { Module } from "@nestjs/common";
import { CustomerRepository } from "@app/repositories/customer-repository";
import { PetRepository } from "@app/repositories/pet-repository";
import { PetshopServiceRepository } from "@app/repositories/petshop-service-repository";
import { AppointmentRepository } from "@app/repositories/appointment-repository";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaPetshopServiceRepository } from "./prisma/repositories/prisma-petshop-service-repository";
import { PrismaCustomerRepository } from "./prisma/repositories/prisma-customer-repository";
import { PrismaPetRepository } from "./prisma/repositories/prisma-pet-repository";
import { PrismaAppointmentRepository } from "./prisma/repositories/prisma-appointment-repository";
import { UserRepository } from "@app/repositories/user-repository";
import { PrismaUserRepository } from "./prisma/repositories/prisma-user-repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: PetshopServiceRepository,
      useClass: PrismaPetshopServiceRepository,
    },
    {
      provide: CustomerRepository,
      useClass: PrismaCustomerRepository,
    },
    {
      provide: PetRepository,
      useClass: PrismaPetRepository,
    },
    {
      provide: AppointmentRepository,
      useClass: PrismaAppointmentRepository,
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [PetshopServiceRepository, CustomerRepository, PetRepository, AppointmentRepository, UserRepository,]
})
export class DatabaseModule { }