import { Pet } from "./Pet"
import { PetshopService } from "./PetshopServices"

export type Appointment = {
  id: string
  appointmentTime: Date
  pet: Pet
  service: PetshopService
}