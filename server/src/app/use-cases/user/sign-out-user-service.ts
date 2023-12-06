import { UserRepository } from "@app/repositories/user-repository";
import { Injectable } from "@nestjs/common";


@Injectable()
export class SignOutUserService {
  constructor(private userRepository: UserRepository) { }

  async execute(userId: string) {
    await this.userRepository.updateRefreshToken(userId, null);
  }
}