import { randomUUID } from "node:crypto"
import { Pet } from "./pet"


export interface ClientProps {
  name: string
  phone: string
  pets: Pet[]
}

export class Client {
  private _id: string
  private props: ClientProps

  constructor(props: ClientProps, id?: string) {
    this.props = props
    this._id = id ?? randomUUID()
  }


  public get id() {
    return this._id
  }

  public get name() {
    return this.props.name
  }

  public set name(name: string) {
    this.props.name = name
  }

  public get phone() {
    return this.props.phone
  }

  public set phone(phone: string) {
    this.props.phone = phone
  }

  public get pets() {
    return this.props.pets
  }

  public set pets(pets: Pet[]) {
    this.props.pets = pets
  }
}