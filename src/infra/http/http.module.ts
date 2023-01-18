import { Module } from '@nestjs/common';
import { ClientModule } from './clients/client.module';
import { PetModule } from './pets/pet.module';
import { PetshopServiceModule } from './petshop-services/petshop-service.module';

@Module({
  imports: [PetshopServiceModule, ClientModule, PetModule],
})
export class HttpModule { }
