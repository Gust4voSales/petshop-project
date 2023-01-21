import { ScheduleAppointmentService } from '@app/use-cases/appointment/schedule-appointment-service';
import { Controller, Post, Body } from '@nestjs/common'
import { AppointmentViewModel } from '../view-models/appointment-view-model';
import { CreateAppointmentBody } from './dtos/create-appointment-body';

@Controller("appointments")
export class AppointmentsController {
  constructor(private scheduleAppointmentService: ScheduleAppointmentService) { }

  @Post()
  async create(@Body() body: CreateAppointmentBody) {
    const { appointment } = await this.scheduleAppointmentService.execute(body)

    return { appointment: AppointmentViewModel.toHTTP(appointment) }
  }
}