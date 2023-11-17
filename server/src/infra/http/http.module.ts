import { Module } from '@nestjs/common';
import { AppointmentModule } from './appointment/appointment.module';
import { CustomerModule } from './customers/customer.module';
import { PetModule } from './pets/pet.module';
import { PetshopServiceModule } from './petshop-services/petshop-service.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [PetshopServiceModule, CustomerModule, PetModule, AppointmentModule, SessionModule],
})
export class HttpModule { }
