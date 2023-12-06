import { HashGenerator } from "@app/cryptography/hash-generator";
import { User } from "@app/entities/user";
import { UserRepository } from "@app/repositories/user-repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateDefaultUserService {
  constructor(private userRepository: UserRepository, private hashGenerator: HashGenerator) { }

  async execute() {
    const email = 'admin@email.com'
    const hashedPassword = await this.hashGenerator.hash(process.env.ADMIN_PASSWORD!)

    const user = new User({
      name: 'ADMIN',
      email: email,
      password: hashedPassword,
      refreshToken: null
    })

    await this.userRepository.upsert(user)

    return {
      adminUser: user
    }
  }
}