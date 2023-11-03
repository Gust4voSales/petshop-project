import { BaseEntity } from './base-entity'

export interface PetshopServiceProps {
  title: string
  description: string
  value: number
  duration: number
}

export class PetshopService extends BaseEntity<PetshopServiceProps> {
  public get title() {
    return this.props.title
  }

  public set title(title: string) {
    this.props.title = title
  }

  public get description() {
    return this.props.description
  }

  public set description(description: string) {
    this.props.description = description
  }

  public get value() {
    return this.props.value
  }

  public set value(value: number) {
    this.props.value = value
  }

  public get duration() {
    return this.props.duration
  }

  public set duration(duration: number) {
    this.props.duration = duration
  }

}