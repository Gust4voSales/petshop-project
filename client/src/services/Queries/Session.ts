import { User } from "@@types/User";
import api from "@services/api";

interface SignInParams {
  email: string
  password: string
}
interface SignInResponse {
  user: User
  access_token: string
}
export async function signIn({ email, password }: SignInParams) {
  const { data } = await api.post<SignInResponse>('/sessions', {
    email,
    password
  });
  return data
}