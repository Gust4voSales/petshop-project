import { ListAppointmentsService } from '@app/use-cases/appointment/list-appointments-service';
import { ScheduleAppointmentService } from '@app/use-cases/appointment/schedule-appointment-service';
import { Controller, Post, Body, Get, Query } from '@nestjs/common'
import { AppointmentViewModel } from '../view-models/appointment-view-model';
import { CreateAppointmentBody } from './dtos/create-appointment-body';
import { ListAppointmentsQuery } from './dtos/list-appointments-query';

@Controller("appointments")
export class AppointmentsController {
  constructor(private scheduleAppointmentService: ScheduleAppointmentService, private listAppointmentsService: ListAppointmentsService) { }

  @Get()
  async list(@Query() query: ListAppointmentsQuery) {
    const { appointments } = await this.listAppointmentsService.execute(query)

    return {
      appointments: appointments.map(AppointmentViewModel.toHTTP)
    }
  }

  @Post()
  async create(@Body() body: CreateAppointmentBody) {
    const { appointment } = await this.scheduleAppointmentService.execute(body)

    return { appointment: AppointmentViewModel.toHTTP(appointment) }
  }
}