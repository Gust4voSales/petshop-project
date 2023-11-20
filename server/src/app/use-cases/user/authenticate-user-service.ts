import { Injectable } from "@nestjs/common";
import { UserRepository } from "@app/repositories/user-repository";
import { EntityNotFound } from "../errors/entity-not-found";
import { Encrypter } from "@app/cryptography/encrypter";
import { HashComparer } from "@app/cryptography/hash-comparer";
import { Unauthorized } from "../errors/unauthorized";
import { User } from "@app/entities/user";


interface AuthenticateUserRequest {
  email: string
  password: string
}

@Injectable()
export class AuthenticateUserService {
  constructor(private userRepository: UserRepository, private hashComparer: HashComparer, private encrypter: Encrypter) { }

  async execute(request: AuthenticateUserRequest) {
    const user = await this.userRepository.findByEmail(request.email)

    if (!user) {
      throw new EntityNotFound("User")
    }

    const isPasswordValid = await this.hashComparer.compare(
      request.password,
      user.password,
    )

    if (!isPasswordValid) {
      throw new Unauthorized("Invalid password")
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(), // token subject identifier
      name: user.name,
      email: user.email,
    })

    return {
      user,
      accessToken,
    }
  }
}