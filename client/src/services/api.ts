import { APIError } from "@/@types/API";
import axios, { AxiosError } from "axios";
import { refreshAccessToken } from "./queries/Session";
import { SESSION_TOKENS_STORAGE_KEY, useSessionStore } from "src/stores/session";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

async function refreshUserAccessToken() {
  const storedTokens = localStorage.getItem(SESSION_TOKENS_STORAGE_KEY)
  if (!storedTokens) return false

  try {
    const refreshToken = JSON.parse(storedTokens).refreshToken as string
    const { accessToken, refreshToken: newRefreshToken } = await refreshAccessToken(refreshToken)

    localStorage.setItem(SESSION_TOKENS_STORAGE_KEY, JSON.stringify({ accessToken, refreshToken: newRefreshToken }))
    setAPIAuthorizationHeader(accessToken)

    return accessToken
  } catch (err) {
    return false
  }
}

export function setAPIAuthorizationHeader(accessToken: string) {
  api.defaults.headers.common.Authorization = `Bearer ${accessToken}`
}
export function setAPIRefreshTokenInterceptor() {
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as any;
      const errMessage = axios.isAxiosError(error) ? (error.response?.data as APIError).message : undefined

      // refresh invalid access token logic
      if (errMessage === 'Invalid token' && !originalRequest?._retry) {
        originalRequest._retry = true;

        const accessToken = await refreshUserAccessToken();

        if (accessToken) {
          // redo the original request with a valid token
          return api({ ...originalRequest, headers: { Authorization: `Bearer ${accessToken}` } });
        }

        // not able to refresh token
        useSessionStore.getState().signOut()
        return
      }

      return Promise.reject(error);
    }
  );
}

export default api;