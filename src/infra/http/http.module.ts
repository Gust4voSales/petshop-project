import { Module } from '@nestjs/common';
import { PetshopServiceModule } from './petshop-services/petshop-service.module';

@Module({
  imports: [PetshopServiceModule],
})
export class HttpModule { }
