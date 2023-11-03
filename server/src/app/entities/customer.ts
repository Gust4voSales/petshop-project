import { Pet } from "./pet"
import { BaseEntity } from "./BaseEntity"


export interface CustomerPet extends Omit<Pet, 'id' | 'ownerId'> {
  id?: string,
  ownerId?: string
}

interface CustomerProps {
  name: string
  phone: string
  pets: Pet[] | CustomerPet[]
}

export class Customer extends BaseEntity<CustomerProps>{
  constructor(props: CustomerProps, id?: string) {
    super(props, id)

    const customerPets = props.pets.map(pet => {
      if (pet.id) return pet as Pet

      return new Pet({ ...pet as CustomerPet, ownerId: this.id })
    })
    this.props = { ...props, pets: customerPets }
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