import { BaseEntity } from "./base-entity";

interface UserProps {
  name: string
  email: string
  password?: string
  refreshToken?: string | null
}

export class User extends BaseEntity<UserProps> {
  constructor(props: UserProps, id?: string) {
    super(props, id)
  }

  public get name() {
    return this.props.name
  }

  public get email() {
    return this.props.email
  }

  public get password() {
    return this.props.password
  }

  public get refreshToken(): string | null {
    return this.props.refreshToken ?? null
  }

}