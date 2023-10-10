import { randomUUID } from "node:crypto"
import { Pet } from "./pet"


export interface CustomerPet extends Omit<Pet, 'id' | 'ownerId'> {
  id?: string,
  ownerId?: string
}

interface CustomerProps {
  name: string
  phone: string
  pets: Pet[] | CustomerPet[]
}

export class Customer {
  private _id: string
  private props: CustomerProps

  constructor(props: CustomerProps, id?: string) {
    this._id = id ?? randomUUID()

    const customerPets = props.pets.map(pet => {
      if (pet.id) return pet as Pet

      return new Pet({ ...pet as CustomerPet, ownerId: this._id })
    })
    this.props = { ...props, pets: customerPets }
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
    return this.props.pets as Pet[]
  }

  public set pets(pets: Pet[]) {
    this.props.pets = pets
  }
}