import { User } from '@@types/User'
import api from '@services/api'
import { create, StoreApi } from 'zustand'

type SessionStore = {
  user: User | null
  isLoggedIn: boolean
  access_token: string
  signIn: (user: User, access_token: string) => void
  signOut: () => void
}
type SetState = StoreApi<SessionStore>['setState']

const defaultState = {
  access_token: '',
  isLoggedIn: false,
  user: null,
}

// set client session initial state, checking in the local storage for session data
const getClientInitialState = () => {
  if (typeof localStorage === 'undefined') return defaultState

  const session = localStorage.getItem('session')
  if (session) {
    try {
      const { user, access_token } = JSON.parse(session)
      setAuthorizationHeaderInterceptor(access_token)

      return {
        access_token,
        isLoggedIn: true,
        user,
      }
    } catch (err) {
      console.log(err)
    }
  }
  return defaultState
}

function setAuthorizationHeaderInterceptor(accessToken: string) {
  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${accessToken}`
    return config
  })
}

function signIn(set: SetState, user: User, access_token: string) {
  localStorage.setItem('session', JSON.stringify({ user, access_token }))
  setAuthorizationHeaderInterceptor(access_token)
  set({ user, access_token, isLoggedIn: true })
}

function signOut(set: SetState) {
  localStorage.removeItem('session')
  api.interceptors.request.clear()
  set({ ...defaultState })
}

export const useSessionStore = create<SessionStore>((set) => ({
  ...getClientInitialState(),
  signIn: (user: User, access_token: string) => {
    signIn(set, user, access_token)
  },
  signOut: () => signOut(set),
})
)
