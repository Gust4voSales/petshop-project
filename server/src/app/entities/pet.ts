import { randomUUID } from "node:crypto"


export interface PetProps {
  name: string
  age: number
  breed: string

  ownerId: string
}

export class Pet {
  private _id: string
  private props: PetProps

  constructor(props: PetProps, id?: string) {
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

  public get age() {
    return this.props.age
  }

  public set age(age: number) {
    this.props.age = age
  }

  public get breed() {
    return this.props.breed
  }

  public set breed(breed: string) {
    this.props.breed = breed
  }

  public get ownerId() {
    return this.props.ownerId
  }

  public set ownerId(ownerId: string) {
    this.props.ownerId = ownerId
  }
}