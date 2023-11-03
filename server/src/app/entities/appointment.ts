import { Pet } from "./pet"
import { PetshopService } from "./petshop-service"
import { BaseEntity } from "./base-entity"

interface AppointmentProps {
  petId: string
  serviceId: string
  appointmentTime: Date
  pet?: Pet
  service?: PetshopService
}

export class Appointment extends BaseEntity<AppointmentProps> {
  public get petId() {
    return this.props.petId
  }

  public set petId(petId: string) {
    this.props.petId = petId
  }

  public get pet() {
    return this.props.pet
  }


  public get serviceId() {
    return this.props.serviceId
  }

  public set serviceId(serviceId: string) {
    this.props.serviceId = serviceId
  }

  public get service() {
    return this.props.service
  }

  public get appointmentTime() {
    return this.props.appointmentTime
  }

  public set appointmentTime(appointmentTime: Date) {
    this.props.appointmentTime = appointmentTime
  }

}