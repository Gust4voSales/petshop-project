import { BaseEntity } from "./BaseEntity"


export interface PetProps {
  name: string
  age: number
  breed: string

  ownerId: string
}

export class Pet extends BaseEntity<PetProps>{
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