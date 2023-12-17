import { User } from "@/@types/User";
import api from "@/services/api";

interface SignInParams {
  email: string
  password: string
}
interface SignInResponse {
  user: User
  accessToken: string
  refreshToken: string
}
export async function signIn({ email, password }: SignInParams) {
  const { data } = await api.post<SignInResponse>('/sessions', {
    email,
    password
  });
  return data
}

interface RefreshTokenResponse {
  accessToken: string
  refreshToken: string
}
export async function refreshAccessToken(refreshToken: string) {
  const { data } = await api.post<RefreshTokenResponse>('/sessions/refresh-token', {
    refreshToken,
  })

  return data
}