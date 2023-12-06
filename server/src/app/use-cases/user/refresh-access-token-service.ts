import { HashComparer } from "@app/cryptography/hash-comparer";
import { UserRepository } from "@app/repositories/user-repository";
import { Injectable } from "@nestjs/common";
import { EntityNotFound } from "../errors/entity-not-found";
import { Unauthorized } from "../errors/unauthorized";
import { Encrypter } from "@app/cryptography/encrypter";
import { generateAccessTokens } from "./helpers/generate-access-tokens";

interface RefreshAccessTokenRequest {
  userId: string
  refreshToken: string
}

@Injectable()
export class RefreshAccessTokenService {
  constructor(private userRepository: UserRepository, private hashComparer: HashComparer, private encrypter: Encrypter) { }

  async execute(request: RefreshAccessTokenRequest) {
    const user = await this.userRepository.findById(request.userId)

    if (!user || !user.refreshToken) {
      throw new Unauthorized("Access denied")
    }

    const isRefreshTokenValid = await this.hashComparer.compare(request.refreshToken, user.refreshToken)

    if (!isRefreshTokenValid) {
      throw new Unauthorized("Access denied")
    }

    const tokens = await generateAccessTokens(user, this.encrypter)

    return tokens
  }

}