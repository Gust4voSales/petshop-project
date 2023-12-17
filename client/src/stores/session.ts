import { User } from '@/@types/User'
import api, { setAPIAuthorizationHeader, setAPIRefreshTokenInterceptor } from '@/services/api'
import { create, } from 'zustand'

export const SESSION_USER_STORAGE_KEY = "@session/user"
export const SESSION_TOKENS_STORAGE_KEY = "@session/tokens"

type SessionStore = {
  user: User | null
  isLoggedIn: boolean
  signIn: (user: User, accessToken: string, refreshToken: string) => void
  signOut: () => void
}

const defaultState = {
  isLoggedIn: false,
  user: null,
}

// set client session initial state, checking in the local storage for session data
const getClientInitialState = () => {
  if (typeof localStorage === 'undefined') return defaultState

  const storedUser = localStorage.getItem(SESSION_USER_STORAGE_KEY)
  const storedTtokens = localStorage.getItem(SESSION_TOKENS_STORAGE_KEY)

  if (storedUser && storedTtokens) {
    try {
      const user = JSON.parse(storedUser)
      const { accessToken } = JSON.parse(storedTtokens)

      setAPIAuthorizationHeader(accessToken)
      setAPIRefreshTokenInterceptor()

      return {
        isLoggedIn: true,
        user,
      }
    } catch (err) {
      console.log(err)
    }
  }
  return defaultState
}

export const useSessionStore = create<SessionStore>((set) => ({
  ...getClientInitialState(),
  signIn: (user: User, accessToken: string, refreshToken: string) => {
    localStorage.setItem(SESSION_USER_STORAGE_KEY, JSON.stringify(user))
    localStorage.setItem(SESSION_TOKENS_STORAGE_KEY, JSON.stringify({ accessToken, refreshToken }))

    setAPIAuthorizationHeader(accessToken)
    setAPIRefreshTokenInterceptor()

    set({ user, isLoggedIn: true })
  },
  signOut: () => {
    localStorage.removeItem(SESSION_USER_STORAGE_KEY)
    localStorage.removeItem(SESSION_TOKENS_STORAGE_KEY)

    api.defaults.headers.common.Authorization = undefined
    api.interceptors.response.clear()

    set({ ...defaultState })
  }
})
)
