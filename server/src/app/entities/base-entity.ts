import { randomUUID } from "node:crypto"

export abstract class BaseEntity<Props> {
  private _id: string
  protected props: Props

  constructor(props: Props, id?: string) {
    this.props = props
    this._id = id ?? randomUUID()
  }

  get id() {
    return this._id
  }
}