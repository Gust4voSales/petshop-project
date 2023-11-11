import { Appointment, AppointmentStatus } from "@app/entities/appointment";
import { PetViewModel } from "./pet-view-model";
import { PetshopServiceViewModel } from "./petshop-service-view-model";

type AppointmentViewModelToHttp = {
  id: string
  appointmentTime: Date
  petId: string
  serviceId: string
  status: AppointmentStatus

  pet?: ReturnType<typeof PetViewModel.toHTTP>
  service?: ReturnType<typeof PetshopServiceViewModel.toHTTP>
}

export class AppointmentViewModel {
  static toHTTP(appointment: Appointment) {
    const appointmentViewModel: AppointmentViewModelToHttp = {
      id: appointment.id,
      appointmentTime: appointment.appointmentTime,
      petId: appointment.petId,
      serviceId: appointment.serviceId,
      status: appointment.status,
    }
    if (appointment.pet) {
      appointmentViewModel.pet = PetViewModel.toHTTP(appointment.pet)
    }
    if (appointment.service) {
      appointmentViewModel.service = PetshopServiceViewModel.toHTTP(appointment.service)
    }
    return appointmentViewModel
  }
}