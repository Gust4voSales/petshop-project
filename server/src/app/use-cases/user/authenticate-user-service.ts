import { Injectable } from "@nestjs/common";
import { UserRepository } from "@app/repositories/user-repository";
import { EntityNotFound } from "../errors/entity-not-found";
import { Encrypter } from "@app/cryptography/encrypter";
import { HashComparer } from "@app/cryptography/hash-comparer";
import { Unauthorized } from "../errors/unauthorized";
import { HashGenerator } from "@app/cryptography/hash-generator";
import { generateAccessTokens } from "./helpers/generate-access-tokens";


interface AuthenticateUserRequest {
  email: string
  password: string
}

@Injectable()
export class AuthenticateUserService {
  constructor(private userRepository: UserRepository, private hashComparer: HashComparer, private hashGenerator: HashGenerator, private encrypter: Encrypter) { }

  async execute(request: AuthenticateUserRequest) {
    const user = await this.userRepository.findByEmail(request.email)

    if (!user) {
      throw new EntityNotFound("User")
    }

    const isPasswordValid = await this.hashComparer.compare(
      request.password,
      user.password!,
    )

    if (!isPasswordValid) {
      throw new Unauthorized("Invalid password")
    }

    const { accessToken, refreshToken } = await generateAccessTokens(user, this.encrypter)

    // save hashed refresh token for security
    const hashedRefreshToken = await this.hashGenerator.hash(refreshToken)
    await this.userRepository.updateRefreshToken(user.id, hashedRefreshToken)

    return {
      user,
      accessToken,
      refreshToken,
    }
  }
}