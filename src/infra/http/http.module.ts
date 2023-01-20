import { Module } from '@nestjs/common';
import { CustomerModule } from './customers/customer.module';
import { PetModule } from './pets/pet.module';
import { PetshopServiceModule } from './petshop-services/petshop-service.module';

@Module({
  imports: [PetshopServiceModule, CustomerModule, PetModule],
})
export class HttpModule { }
