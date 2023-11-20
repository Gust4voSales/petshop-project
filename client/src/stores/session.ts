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

const getInitialState = () => {
  const defaultState = {
    access_token: '',
    isLoggedIn: false,
    user: null,
  }

  const session = localStorage.getItem('session')
  if (session) {
    try {
      const { user, access_token } = JSON.parse(session)
      return {
        access_token,
        isLoggedIn: true,
        user,
      }
    } catch (err) {
      console.log(err)
      return defaultState
    }
  }

  return defaultState
}

function signIn(set: SetState, user: User, access_token: string) {
  localStorage.setItem('session', JSON.stringify({ user, access_token }))
  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${access_token}`
    return config
  })
  set({ user, access_token, isLoggedIn: true })
}

function signOut(set: SetState) {
  localStorage.removeItem('session')
  api.interceptors.request.clear()
  set({ ...getInitialState() })
}

export const useSessionStore = create<SessionStore>((set) => ({
  ...getInitialState(),
  signIn: (user: User, access_token: string) => {
    signIn(set, user, access_token)
  },
  signOut: () => signOut(set),
})
)
