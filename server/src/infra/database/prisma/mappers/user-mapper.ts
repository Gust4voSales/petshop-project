import { User } from "@app/entities/user";
import { User as RawUser } from "@prisma/client";

export class UserMapper {
  static toDomain(user: RawUser) {
    return new User({
      name: user.name,
      email: user.email,
      password: user.password
    }, user.id)
  }
}