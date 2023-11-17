import { Injectable } from "@nestjs/common";
import { User } from "@app/entities/user";
import { UserRepository } from "@app/repositories/user-repository";
import { PrismaService } from "../prisma.service";
import { UserMapper } from "../mappers/user-mapper";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prismaService: PrismaService) { }

  async upsert(user: User): Promise<void> {
    await this.prismaService.user.upsert({
      where: {
        email: user.email
      },
      update: {},
      create: {
        id: user.id,
        name: user.email,
        email: user.email,
        password: user.password,
      }
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email
      }
    })

    if (!user) return null
    return UserMapper.toDomain(user)
  }

}