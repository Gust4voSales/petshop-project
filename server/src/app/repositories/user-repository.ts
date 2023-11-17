import { User } from "@app/entities/user";

export abstract class UserRepository {
  abstract upsert(user: User): Promise<void>
  abstract findByEmail(email: string): Promise<User | null>
}