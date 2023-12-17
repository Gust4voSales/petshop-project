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
      expiresIn: '1d' // on real scenarios with real users, use short expirations for security
    }),

    encrypter.encrypt({ ...encryptionData }, {
      expiresIn: '30d' // on real scenarios with real users, use short expirations for security
    }),
  ])

  return {
    accessToken,
    refreshToken
  }
}