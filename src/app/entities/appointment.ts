import { randomUUID } from "node:crypto"

interface AppointmentProps {
  petId: string
  serviceId: string
  appointmentTime: Date
}

export class Appointment {
  private _id: string
  private props: AppointmentProps

  constructor(props: AppointmentProps, id?: string) {
    this.props = props
    this._id = id ?? randomUUID()
  }

  public get id() {
    return this._id
  }

  public get petId() {
    return this.props.petId
  }

  public set petId(petId: string) {
    this.props.petId = petId
  }

  public get serviceId() {
    return this.props.serviceId
  }

  public set serviceId(serviceId: string) {
    this.props.serviceId = serviceId
  }

  public get appointmentTime() {
    return this.props.appointmentTime
  }

  public set appointmentTime(appointmentTime: Date) {
    this.props.appointmentTime = appointmentTime
  }

}