import { Module } from '@nestjs/common'
import { ScheduleAppointmentService } from '@app/use-cases/appointment/schedule-appointment-service';
import { DatabaseModule } from '@infra/database/database.module';
import { AppointmentsController } from './appointments.controller';
import { ListAppointmentsService } from '@app/use-cases/appointment/list-appointments-service';
import { CancelAppointmentService } from '@app/use-cases/appointment/cancel-appointment-service';
import { ShowAppointmentService } from '@app/use-cases/appointment/show-appointment-service';
import { UpdateAppointmentStatusService } from '@app/use-cases/appointment/update-appointment-status-service';

@Module({
  imports: [DatabaseModule],
  controllers: [AppointmentsController],
  providers: [ScheduleAppointmentService, ShowAppointmentService, ListAppointmentsService, CancelAppointmentService, UpdateAppointmentStatusService],
})
export class AppointmentModule { }