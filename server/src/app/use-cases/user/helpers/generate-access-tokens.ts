import { Encrypter } from "@app/cryptography/encrypter";
import { User } from "@app/entities/user";

export interface UserTokenPayload {
  sub: string
  name: string
  email: string
}

export async function generateAccessTokens(user: User, encrypter: Encrypter) {
  const encryptionData: UserTokenPayload = {
    sub: user.id, // token subject identifier
    name: user.name,
    email: user.email,
  }

  const [accessToken, refreshToken] = await Promise.all([
    encrypter.encrypt({ ...encryptionData }, {
      expiresIn: '10s'
    }),

    encrypter.encrypt({ ...encryptionData }, {
      expiresIn: '7d'
    }),
  ])

  return {
    accessToken,
    refreshToken
  }
}