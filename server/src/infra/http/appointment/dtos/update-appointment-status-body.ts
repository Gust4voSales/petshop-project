import { AppointmentStatus } from "@app/entities/appointment";
import { IsEnum } from "class-validator";

export class UpdateAppointmentStatusBody {
  @IsEnum(AppointmentStatus)
  status: AppointmentStatus
}