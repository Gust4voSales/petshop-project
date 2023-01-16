import { CreatePetshopService } from '@app/use-cases/petshop-service/create-petshop-service';
import { ListPetshopServices } from '@app/use-cases/petshop-service/list-petshop-services';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { HelloWorldController } from './controllers/hello-world.controller';
import { PetshopServicesController } from './controllers/petshop-services/petshop-services.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [HelloWorldController, PetshopServicesController],
  providers: [CreatePetshopService, ListPetshopServices],
})
export class HttpModule { }
