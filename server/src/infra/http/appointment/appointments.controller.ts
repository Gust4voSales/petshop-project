import { CancelAppointmentService } from '@app/use-cases/appointment/cancel-appointment-service';
import { ListAppointmentsService } from '@app/use-cases/appointment/list-appointments-service';
import { ScheduleAppointmentService } from '@app/use-cases/appointment/schedule-appointment-service';
import { Controller, Post, Body, Get, Query, Delete, Param, Patch } from '@nestjs/common'
import { AppointmentViewModel } from '../view-models/appointment-view-model';
import { CreateAppointmentBody } from './dtos/create-appointment-body';
import { ListAppointmentsQuery } from './dtos/list-appointments-query';
import { ShowAppointmentService } from '@app/use-cases/appointment/show-appointment-service';
import { UpdateAppointmentStatusBody } from './dtos/update-appointment-status-body';
import { UpdateAppointmentStatusService } from '@app/use-cases/appointment/update-appointment-status-service';

@Controller("appointments")
export class AppointmentsController {
  constructor(private scheduleAppointmentService: ScheduleAppointmentService, private showAppointmentService: ShowAppointmentService, private listAppointmentsService: ListAppointmentsService, private cancelAppointmentService: CancelAppointmentService, private updateAppointmentStatusService: UpdateAppointmentStatusService) { }

  @Get()
  async list(@Query() query: ListAppointmentsQuery) {
    const { appointments, meta } = await this.listAppointmentsService.execute(query)

    return {
      appointments: appointments.map(AppointmentViewModel.toHTTP),
      meta,
    }
  }

  @Get(':id')
  async show(@Param("id") id: string) {
    const { appointment } = await this.showAppointmentService.execute(id)

    return { appointment: AppointmentViewModel.toHTTP(appointment) }
  }

  @Post()
  async create(@Body() body: CreateAppointmentBody) {
    const { appointment } = await this.scheduleAppointmentService.execute(body)

    return { appointment: AppointmentViewModel.toHTTP(appointment) }
  }

  @Patch(':id')
  async updateStatus(@Param("id") id: string, @Body() body: UpdateAppointmentStatusBody) {
    const { appointment } = await this.updateAppointmentStatusService.execute({
      id, status: body.status
    })

    return { appointment: AppointmentViewModel.toHTTP(appointment) }
  }

  @Delete(':id')
  async destroy(@Param('id') id: string) {
    await this.cancelAppointmentService.execute(id)
  }
}