import { IsEmail, IsString } from "class-validator"

export class AuthenticateUserBody {
  @IsEmail()
  email: string

  @IsString()
  password: string
}