import { Pet } from "./Pet"

export type Customer = {
  id: string
  name: string
  phone: string
  pets: Pet[]
}