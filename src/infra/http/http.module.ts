import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { PetshopServiceModule } from './petshop-services/petshop-service.module';

@Module({
  imports: [PetshopServiceModule, ClientModule],
})
export class HttpModule { }
