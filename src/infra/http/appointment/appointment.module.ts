import { Module } from '@nestjs/common'
import { ScheduleAppointmentService } from '@app/use-cases/appointment/schedule-appointment-service';
import { DatabaseModule } from '@infra/database/database.module';
import { AppointmentsController } from './appointments.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [AppointmentsController],
  providers: [ScheduleAppointmentService]
})
export class AppointmentModule { }