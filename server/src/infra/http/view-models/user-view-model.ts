import { User } from "@app/entities/user";

export class UserViewModel {
  static toHTTP(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    }
  }
}