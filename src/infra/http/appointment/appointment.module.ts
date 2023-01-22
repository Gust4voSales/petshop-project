import { Module } from '@nestjs/common'
import { ScheduleAppointmentService } from '@app/use-cases/appointment/schedule-appointment-service';
import { DatabaseModule } from '@infra/database/database.module';
import { AppointmentsController } from './appointments.controller';
import { ListAppointmentsService } from '@app/use-cases/appointment/list-appointments-service';

@Module({
  imports: [DatabaseModule],
  controllers: [AppointmentsController],
  providers: [ScheduleAppointmentService, ListAppointmentsService]
})
export class AppointmentModule { }