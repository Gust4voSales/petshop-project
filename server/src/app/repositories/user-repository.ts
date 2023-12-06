import { User } from "@app/entities/user";

export abstract class UserRepository {
  abstract upsert(user: User): Promise<void>
  abstract findById(id: string): Promise<User | null>
  abstract findByEmail(email: string): Promise<User | null>
  abstract updateRefreshToken(userId: string, refreshToken: string | null): Promise<void>
} 